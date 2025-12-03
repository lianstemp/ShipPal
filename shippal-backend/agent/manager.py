import os
import json
import logging
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from strands import Agent, tool
from strands.models.openai import OpenAIModel
from utils.supabase_client import supabase

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure LLM
llm_api_key = os.environ.get("LLM_API_KEY")
llm_base_url = os.environ.get("LLM_BASE_URL")

model = OpenAIModel(
    client_args={
        "api_key": llm_api_key,
        "base_url": llm_base_url,
    },
    model_id=os.environ.get("LLM_MODEL_ID"),
    params={
        "temperature": 0.2, 
    }
)

@tool(
    name="create_compliance_documents",
    description="Creates multiple compliance document entries in the database in a single batch.",
    inputSchema={
        "json": {
            "type": "object",
            "properties": {
                "deal_id": {
                    "type": "string",
                    "description": "The ID of the deal."
                },
                "documents": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "title": {"type": "string"},
                            "description": {"type": "string"},
                            "type": {"type": "string"},
                            "uploader_id": {"type": "string"},
                            "owner_role": {"type": "string"},
                            "is_optional": {"type": "boolean"}
                        },
                        "required": ["title", "description", "type", "uploader_id", "owner_role"]
                    },
                    "description": "A list of document objects to create."
                }
            },
            "required": ["deal_id", "documents"]
        }
    }
)
def create_compliance_documents(deal_id: str, documents: List[Dict[str, Any]]) -> str:
    """
    Creates multiple compliance document entries in the database in a single batch.
    
    Args:
        deal_id: The ID of the deal.
        documents: A list of document dictionaries.
    """
    try:
        logger.info(f"Starting compliance document creation for deal {deal_id}")
        
        data_to_insert = []
        for doc in documents:
            data_to_insert.append({
                "deal_id": deal_id,
                "uploader_id": doc.get("uploader_id"),
                "document_type": doc.get("type"),
                "title": doc.get("title"),
                "description": doc.get("description"),
                "status": "pending",
                "file_url": "",
                "owner_role": doc.get("owner_role"),
                "is_optional": doc.get("is_optional", False)
            })
            
        if data_to_insert:
            supabase.table("compliance_documents").insert(data_to_insert).execute()
            logger.info(f"Successfully inserted {len(data_to_insert)} documents for deal {deal_id}")
            
        return f"Successfully created {len(documents)} compliance documents."
    except Exception as e:
        logger.error(f"Error creating documents: {e}", exc_info=True)
        return f"Error creating documents: {e}"

agent = Agent(model=model, tools=[create_compliance_documents])

async def generate_document_checklist(deal_id: str):
    """
    Manager Agent logic.
    Generates a list of required documents based on the deal details using tools.
    """
    # Fetch deal details
    deal_response = supabase.table("deals").select("*, items:deal_items(*), contact:contacts(*)").eq("id", deal_id).single().execute()
    deal = deal_response.data
    
    if not deal:
        logger.error(f"Deal {deal_id} not found")
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
    
    Based on these details, generate a list of ESSENTIAL compliance documents for international trade.
    
    INSTRUCTIONS:
    1. Analyze the deal details.
    2. Determine the ESSENTIAL documents needed (e.g., Invoice, Packing List, Bill of Lading).
    3. Use the `create_compliance_documents` tool.
       - `deal_id`: {deal_id}
       - `documents`: A list of objects.
         Example format:
         [
           {{
             "title": "Commercial Invoice",
             "description": "Standard invoice...",
             "type": "Invoice",
             "uploader_id": "{seller_id}",
             "owner_role": "seller",
             "is_optional": false
           }}
         ]
    4. **CRITICAL: Keep the description VERY SIMPLE and CLEAN.**
    5. After creating the documents, reply with a VERY SHORT summary message.
    
    RESPONSE FORMAT:
    - Do NOT use markdown formatting.
    - Just say: "Compliance documents generated."
    """

    # Generate response
    # Generate response
    # Run the agent with tools
    response = agent(system_prompt)
    
    # Verify that documents were actually created
    existing_docs = supabase.table("compliance_documents").select("id").eq("deal_id", deal_id).execute()
    if not existing_docs.data:
        logger.error(f"Agent failed to generate documents for deal {deal_id}")
        raise Exception("Agent failed to generate compliance documents. Please try again.")

    # Send a message to the chat with the agent's summary
    contact_id = deal.get("contact_id")
    
    ai_reply = response.text if hasattr(response, 'text') else str(response)
    
    supabase.table("messages").insert({
        "contact_id": contact_id,
        "sender_id": seller_id, # Attributed to seller but marked AI
        "content_original": f"Deal Sealed! {ai_reply}",
        "is_ai_generated": True
    }).execute()
