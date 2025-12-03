import os
from openai import OpenAI
from utils.supabase_client import supabase

# Use OpenAI SDK directly to avoid Strands Agent bug with empty tools array
llm_api_key = os.environ.get("LLM_API_KEY")
llm_base_url = os.environ.get("LLM_BASE_URL")
llm_model_id = os.environ.get("LLM_MODEL_ID")

# Initialize OpenAI client directly
client = OpenAI(
    api_key=llm_api_key,
    base_url=llm_base_url
)

async def handle_incoming_message(message: dict):
    """
    AI Negotiator logic using Strands Agents.
    """
    content = message.get("content_original", "")
    contact_id = message.get("contact_id")
    sender_id = message.get("sender_id")

    # Fetch contact details to know who is who
    contact_res = supabase.table("contacts").select("*, buyer:buyer_id(full_name, company_name), seller:seller_id(full_name, company_name)").eq("id", contact_id).single().execute()
    contact = contact_res.data
    
    if not contact:
        return

    buyer_name = contact['buyer']['full_name']
    seller_name = contact['seller']['full_name']
    
    # Determine who sent the message
    sender_name = buyer_name if sender_id == contact['buyer_id'] else seller_name

    # Fetch context (last 10 messages)
    history = supabase.table("messages").select("*").eq("contact_id", contact_id).order("created_at", desc=True).limit(10).execute()
    messages_history = history.data[::-1]

    # Check if AI should reply
    # Only reply if explicitly tagged with "@pal"
    should_reply = False
    if "@pal" in content.lower():
        should_reply = True
    
    if not should_reply:
        return

    # Fetch Buyer's Country for Shipping Estimation
    # We assume the seller is from Indonesia as per requirements.
    buyer_profile = supabase.table("profiles").select("country").eq("id", contact['buyer_id']).single().execute()
    buyer_country = buyer_profile.data.get('country') if buyer_profile.data else "Unknown"

    # Fetch Active Deal and Items
    deal_context = "No active deal yet."
    deal_items_str = "No items added yet."
    
    # Find the latest deal for this contact
    deals_res = supabase.table("deals").select("id, status, total_amount, currency").eq("contact_id", contact_id).order("created_at", desc=True).limit(1).execute()
    if deals_res.data:
        deal = deals_res.data[0]
        deal_context = f"Active Deal Status: {deal['status']}, Total Amount: {deal['total_amount']} {deal['currency']}"
        
        # Fetch items for this deal
        items_res = supabase.table("deal_items").select("*").eq("deal_id", deal['id']).execute()
        if items_res.data:
            items_list = []
            for item in items_res.data:
                items_list.append(f"- {item['name']} (Qty: {item['quantity']}, Price: {item['price_per_unit']})")
            deal_items_str = "\n".join(items_list)

    # Construct system prompt
    system_prompt = f"""You are ShipPal AI, a smart B2B negotiation assistant.
    You are assisting a negotiation between:
    - Buyer: {buyer_name} ({contact['buyer']['company_name']}) from {buyer_country}
    - Seller: {seller_name} ({contact['seller']['company_name']}) from Indonesia
    
    Current Deal Context:
    {deal_context}
    
    Items in Deal Room:
    {deal_items_str}
    
    Your goal is to facilitate the deal and provide shipping estimates.
    
    INSTRUCTIONS:
    1. You have been tagged with @pal.
    2. If asked about shipping costs/estimates:
       - The shipment is from Indonesia to {buyer_country}. DO NOT ASSUME the destination if {buyer_country} is known.
       - USE THE ITEMS LISTED ABOVE to estimate the weight/volume.
       - Provide a realistic shipping estimate based on standard international freight rates (Sea/Air).
       - Mention that this is an *estimate*.
    3. Be concise, professional, and helpful.
    4. Do NOT introduce yourself in every message.
    5. IMPORTANT: DO NOT use markdown bolding (asterisks like **text**). Use plain text only.
    """

    # Build messages array for OpenAI
    messages = [
        {"role": "system", "content": system_prompt}
    ]
    
    # Add conversation history
    for msg in messages_history:
        role = "assistant" if msg.get("is_ai_generated") else "user"
        messages.append({"role": role, "content": msg.get('content_original', '')})
    
    # Add current message
    messages.append({"role": "user", "content": content})

    # Generate response using OpenAI directly
    try:
        # Call OpenAI API without tools parameter
        response = client.chat.completions.create(
            model=llm_model_id,
            messages=messages,
            temperature=0.7
        )
        ai_reply = response.choices[0].message.content

        # Save AI response
        supabase.table("messages").insert({
            "contact_id": contact_id,
            "sender_id": sender_id,
            "content_original": ai_reply,
            "is_ai_generated": True,
            "language_code": "en"
        }).execute()
        
    except Exception as e:
        print(f"Error generating AI response: {e}")
