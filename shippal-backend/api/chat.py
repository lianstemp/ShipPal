from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional
from utils.supabase_client import supabase
from agent.negotiator import handle_incoming_message # We will create this agent later

router = APIRouter()

class MessageCreate(BaseModel):
    contact_id: str
    sender_id: str
    content: str
    language_code: Optional[str] = "en"

class MessageResponse(BaseModel):
    id: str
    contact_id: str
    sender_id: str
    content_original: str
    content_translated: Optional[str] = None
    is_ai_generated: bool = False
    created_at: str

@router.get("/{contact_id}", response_model=List[MessageResponse])
async def get_messages(contact_id: str):
    """
    Get message history for a contact.
    """
    response = supabase.table("messages").select("*").eq("contact_id", contact_id).order("created_at", desc=False).execute()
    return response.data

@router.post("/message", response_model=MessageResponse)
async def send_message(message: MessageCreate, background_tasks: BackgroundTasks):
    """
    Send a message. Triggers AI Negotiator.
    """
    # Insert user message
    response = supabase.table("messages").insert({
        "contact_id": message.contact_id,
        "sender_id": message.sender_id,
        "content_original": message.content,
        "language_code": message.language_code,
        "is_ai_generated": False
    }).execute()

    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to send message")
    
    saved_message = response.data[0]

    # Trigger AI Negotiator in background
    background_tasks.add_task(handle_incoming_message, saved_message)

    return saved_message
