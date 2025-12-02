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
    # Trigger AI Agent (Manager) to generate document checklist
    # We do this BEFORE sealing to ensure it works.
    await generate_document_checklist(deal_id)

    # Update status
    response = supabase.table("deals").update({"status": "sealed"}).eq("id", deal_id).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to seal deal")
    
    deal = response.data[0]
    
    return deal
