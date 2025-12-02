import os
from typing import List
from pydantic import BaseModel, Field
from strands import Agent, tool
from strands.models.openai import OpenAIModel
from utils.supabase_client import supabase

# Configure OpenRouter
openrouter_api_key = os.environ.get("OPENROUTER_API_KEY")
openrouter_base_url = os.environ.get("OPENROUTER_BASE_URL")

model = OpenAIModel(
    client_args={
        "api_key": openrouter_api_key,
        "base_url": openrouter_base_url,
    },
    model_id=os.environ.get("OPENROUTER_MODEL_ID"),
    params={
        "temperature": 0.2, 
    }
)

@tool
def create_compliance_document(deal_id: str, title: str, description: str, type: str, uploader_id: str, owner_role: str = "seller", is_optional: bool = False):
    """
    Creates a required compliance document entry in the database.
    
    Args:
        deal_id: The ID of the deal.
        title: Title of the document (e.g., Commercial Invoice).
        description: Specific details required in this document.
        type: Category of document (e.g., Invoice, Packing List, Certificate).
        uploader_id: The ID of the user responsible for uploading.
        owner_role: Who is responsible? 'buyer' or 'seller'.
        is_optional: Is this document optional? Default False.
    """
    try:
        supabase.table("compliance_documents").insert({
            "deal_id": deal_id,
            "uploader_id": uploader_id,
            "document_type": type,
            "title": title,
            "description": description,
            "status": "pending",
            "file_url": "",
            "owner_role": owner_role,
            "is_optional": is_optional
        }).execute()
        return f"Successfully created requirement for document: {title}"
    except Exception as e:
        return f"Error creating document: {e}"

agent = Agent(model=model, tools=[create_compliance_document])

async def generate_document_checklist(deal_id: str):
    """
    Manager Agent logic.
    Generates a list of required documents based on the deal details using tools.
    """
    # Fetch deal details
    deal_response = supabase.table("deals").select("*, items:deal_items(*), contact:contacts(*)").eq("id", deal_id).single().execute()
    deal = deal_response.data
    
    if not deal:
        print(f"Deal {deal_id} not found")
        return

    seller_id = deal.get("contact", {}).get("seller_id")
    buyer_id = deal.get("contact", {}).get("buyer_id")

    # Construct prompt
    system_prompt = f"""You are ShipPal Manager, a compliance expert.
    A B2B deal has been sealed. 
    Deal ID: {deal_id}
    Items: {deal.get('items')}
    Amount: {deal.get('total_amount')}
    Seller ID: {seller_id}
    Buyer ID: {buyer_id}
    
    Based on these details (product type, amount), your task is to generate a specific list of required compliance documents for international trade.
    
    INSTRUCTIONS:
    1. Analyze the deal details to determine necessary documents.
    2. For EACH document, decide:
       - Who is responsible? (usually 'seller' for invoices/certs, 'buyer' for import permits if needed).
       - Is it optional? (e.g. insurance might be optional).
    3. Use the `create_compliance_document` tool to insert it into the database.
       - Set `uploader_id` to the correct ID ({seller_id} or {buyer_id}).
       - Set `owner_role` to 'seller' or 'buyer'.
       - Set `is_optional` to True or False.
    4. **CRITICAL: Keep the description VERY SIMPLE and CLEAN.**
       - Do NOT include any IDs (UUIDs), product codes, specific prices, or exact quantities in the description.
       - Do NOT include buyer/seller names or addresses in the description.
       - ONLY describe the purpose of the document.
       - BAD: "Invoice for 1x Soft Shell Crab (ID: 123...) value $145.79"
       - GOOD: "Standard commercial invoice including HS codes and Incoterms."
       - GOOD: "Certificate of Origin to verify product source."
    5. After you have created all necessary documents, reply with a VERY SHORT summary message for the user.
    
    RESPONSE FORMAT:
    - Do NOT use markdown formatting (no bolding, no italics, no lists).
    - Do NOT list the documents in your reply (they are already in the database).
    - Just say something simple like: "Compliance documents have been generated. Please check the details tab."
    - Keep it under 2 sentences.
    """

    # Generate response
    # Generate response
    # Run the agent with tools
    response = agent(system_prompt)
    
    # Send a message to the chat with the agent's summary
    contact_id = deal.get("contact_id")
    
    ai_reply = response.text if hasattr(response, 'text') else str(response)
    
    supabase.table("messages").insert({
        "contact_id": contact_id,
        "sender_id": seller_id, # Attributed to seller but marked AI
        "content_original": f"Deal Sealed! {ai_reply}",
        "is_ai_generated": True
    }).execute()
