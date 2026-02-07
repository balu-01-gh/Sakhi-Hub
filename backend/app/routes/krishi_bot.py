"""
Krishi Bot API Routes

Handles Agricultural guidance bot endpoints
"""

from fastapi import APIRouter, HTTPException, status
from app.models.schemas import ChatResponse
from app.services.ai_service import AIService
from app.config.settings import settings
from app.prompts.krishi_bot_prompt import get_krishi_prompt
from pydantic import BaseModel

# Create router
router = APIRouter(prefix="/api/krishi-bot", tags=["Krishi Bot"])

# Initialize AI service
ai_service = AIService()

class KrishiBotRequest(BaseModel):
    message: str
    user_info: dict  # Contains farm_size, crops, location, season

@router.post("/chat", response_model=ChatResponse)
async def krishi_bot_chat(request: KrishiBotRequest):
    """
    Krishi Sakhi - Agricultural guidance for women farmers
    
    Provides personalized farming advice based on:
    - Farm size
    - Current/planned crops
    - Location (for weather and soil context)
    - Season
    """
    try:
        # Generate agricultural system prompt with user context
        system_prompt = get_krishi_prompt(request.user_info)
        
        # Get AI response
        ai_response = await ai_service.get_chat_response(
            user_message=request.message,
            system_prompt=system_prompt
        )
        
        return ChatResponse(
            response=ai_response,
            status="success"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get Krishi Bot response: {str(e)}"
        )
