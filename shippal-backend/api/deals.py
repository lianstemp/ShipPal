from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from utils.supabase_client import supabase
from agent.manager import generate_document_checklist # We will create this agent later

router = APIRouter()

@router.post("/{deal_id}/seal")
async def seal_deal(deal_id: str):
    """
    Seal the deal. This triggers the AI to generate a document checklist.
    """
    # Update status to sealing
    supabase.table("deals").update({"status": "sealing"}).eq("id", deal_id).execute()

    try:
        # 1. Fetch Deal Details (Items & Buyer)
        deal_res = supabase.table("deals").select("*, items:deal_items(*), contact:contacts(*, buyer:profiles!buyer_id(*))").eq("id", deal_id).single().execute()
        deal_data = deal_res.data
        
        if not deal_data:
            raise Exception("Deal not found")

        # 2. Calculate Shipping Cost
        # Logic: Base $50 + ($5 * Total Quantity)
        # Origin: Jakarta, Indonesia (Fixed for now)
        # Destination: Buyer's Country
        
        items = deal_data.get('items', [])
        total_quantity = sum(item['quantity'] for item in items)
        
        buyer_country = deal_data['contact']['buyer'].get('country', 'Unknown')
        origin = "Jakarta, Indonesia"
        destination = buyer_country
        
        # Simple estimation logic
        base_cost = 50
        per_item_cost = 5
        shipping_cost = base_cost + (total_quantity * per_item_cost)
        
        # 3. Trigger AI Agent (Manager) to generate document checklist
        await generate_document_checklist(deal_id)

        # 4. Update status AND Shipping Info
        # Note: Ensure columns shipping_cost, shipping_origin, shipping_destination exist in 'deals' table
        update_data = {
            "status": "sealed",
            "shipping_cost": shipping_cost,
            "shipping_origin": origin,
            "shipping_destination": destination
        }
        
        response = supabase.table("deals").update(update_data).eq("id", deal_id).execute()
        if not response.data:
            raise HTTPException(status_code=400, detail="Failed to seal deal")
        
        deal = response.data[0]
        return deal

    except Exception as e:
        # Revert status to negotiating if anything fails
        print(f"Error sealing deal: {e}")
        supabase.table("deals").update({"status": "negotiating"}).eq("id", deal_id).execute()
        raise HTTPException(status_code=500, detail=f"Failed to seal deal: {str(e)}")
