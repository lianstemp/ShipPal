import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers (we will create these next)
from api.deals import router as deals_router
from api.chat import router as chat_router

app = FastAPI(
    title="ShipPal Backend",
    description="Backend API for ShipPal - AI-powered B2B Matchmaking",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://shippal.vessail.app",
    "*" # Allow all for hackathon/dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(deals_router, prefix="/api/deals", tags=["Deals"])
app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])

@app.get("/")
async def root():
    return {"message": "ShipPal Backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
