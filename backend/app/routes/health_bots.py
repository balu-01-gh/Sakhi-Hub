"""
Health Bots API Routes

Handles Period Care Bot and Pregnancy Care Bot endpoints
Includes date calculations and AI integration
"""

from fastapi import APIRouter, HTTPException, status
from app.models.schemas import PeriodChatRequest, PregnancyChatRequest, ChatResponse
from app.services.ai_service import AIService
from app.config.settings import settings
from datetime import datetime, timedelta
from typing import Dict

# Create router
router = APIRouter(prefix="/api/health-bots", tags=["Health Bots"])

# Initialize AI service
ai_service = AIService()

# ============================================
# HELPER FUNCTIONS
# ============================================

def calculate_next_period(last_period_date_str: str, cycle_length: int = 28) -> Dict:
    """
    Calculate next period date and related information
    
    Args:
        last_period_date_str: Last period date in YYYY-MM-DD format
        cycle_length: Menstrual cycle length (default 28 days)
    
    Returns:
        Dictionary with prediction details
    """
    try:
        # Parse date string
        last_period_date = datetime.strptime(last_period_date_str, "%Y-%m-%d")
        today = datetime.now()
        
        # Calculate days since last period
        days_since = (today - last_period_date).days
        
        # Calculate next period date
        next_period_date = last_period_date + timedelta(days=cycle_length)
        
        # Calculate days until next period
        days_until = (next_period_date - today).days
        
        # Determine cycle phase
        if days_since < 5:
            phase = "Menstrual Phase"
        elif days_since < 14:
            phase = "Follicular Phase"
        elif days_since < 16:
            phase = "Ovulation Phase"
        else:
            phase = "Luteal Phase"
        
        return {
            "next_period_date": next_period_date.strftime("%Y-%m-%d"),
            "days_since_last": days_since,
            "days_until_next": days_until,
            "current_cycle_day": days_since,
            "cycle_phase": phase
        }
    
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid date format. Use YYYY-MM-DD"
        )

def calculate_pregnancy_info(confirmation_date_str: str) -> Dict:
    """
    Calculate pregnancy weeks, trimester, and due date
    
    Args:
        confirmation_date_str: Pregnancy confirmation date in YYYY-MM-DD format
    
    Returns:
        Dictionary with pregnancy details
    """
    try:
        # Parse date string
        confirmation_date = datetime.strptime(confirmation_date_str, "%Y-%m-%d")
        today = datetime.now()
        
        # Calculate weeks pregnant (assuming confirmation was around week 4-6)
        # For simplicity, we'll assume confirmation date is around week 4
        days_since_confirmation = (today - confirmation_date).days
        weeks_pregnant = (days_since_confirmation // 7) + 4  # Add 4 weeks baseline
        
        # Limit to 40 weeks maximum
        if weeks_pregnant > 40:
            weeks_pregnant = 40
        
        # Determine trimester
        if weeks_pregnant <= 12:
            trimester = "First Trimester (Weeks 1-12)"
        elif weeks_pregnant <= 26:
            trimester = "Second Trimester (Weeks 13-26)"
        else:
            trimester = "Third Trimester (Weeks 27-40)"
        
        # Calculate due date (40 weeks from estimated conception)
        # Assuming confirmation was at week 4, add 36 more weeks
        estimated_conception = confirmation_date - timedelta(weeks=4)
        due_date = estimated_conception + timedelta(weeks=40)
        
        # Calculate days until due date
        days_until_due = (due_date - today).days
        
        return {
            "weeks_pregnant": weeks_pregnant,
            "trimester": trimester,
            "due_date": due_date.strftime("%Y-%m-%d"),
            "days_until_due": max(0, days_until_due),  # Don't show negative days
            "confirmation_date": confirmation_date_str
        }
    
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid date format. Use YYYY-MM-DD"
        )

# ============================================
# PERIOD CARE BOT ENDPOINT
# ============================================

@router.post("/period-chat", response_model=ChatResponse)
async def period_chat(request: PeriodChatRequest):
    """
    Period Care Bot Endpoint
    
    Provides menstrual health guidance with:
    - Period prediction
    - Symptom management advice
    - Nutrition tips
    - Emotional support
    """
    try:
        # Calculate next period and cycle information
        period_info = calculate_next_period(
            request.last_period_date,
            settings.DEFAULT_CYCLE_LENGTH
        )
        
        # Get AI response with context
        ai_response = await ai_service.get_period_chat_response(
            user_message=request.user_message,
            age=request.age,
            last_period_date=request.last_period_date,
            next_period_prediction=period_info["next_period_date"],
            days_since=period_info["days_since_last"]
        )
        
        # Build response
        prediction_text = f"Next period expected: {period_info['next_period_date']}"
        if period_info['days_until_next'] > 0:
            prediction_text += f" (in {period_info['days_until_next']} days)"
        else:
            prediction_text += " (period may have started or is due)"
        
        return ChatResponse(
            response=ai_response,
            prediction=prediction_text,
            additional_info=period_info
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process period chat request: {str(e)}"
        )

# ============================================
# PREGNANCY CARE BOT ENDPOINT
# ============================================

@router.post("/pregnancy-chat", response_model=ChatResponse)
async def pregnancy_chat(request: PregnancyChatRequest):
    """
    Pregnancy Care Bot Endpoint
    
    Provides pregnancy guidance with:
    - Trimester-specific advice
    - Nutrition recommendations
    - Exercise safety tips
    - Emotional support
    - Due date tracking
    """
    try:
        # Calculate pregnancy information
        pregnancy_info = calculate_pregnancy_info(request.pregnancy_start_date)
        
        # Get AI response with context
        ai_response = await ai_service.get_pregnancy_chat_response(
            user_message=request.user_message,
            confirmation_date=request.pregnancy_start_date,
            weeks_pregnant=pregnancy_info["weeks_pregnant"],
            trimester=pregnancy_info["trimester"],
            due_date=pregnancy_info["due_date"]
        )
        
        # Build prediction text
        prediction_text = f"Week {pregnancy_info['weeks_pregnant']} - {pregnancy_info['trimester']}"
        if pregnancy_info['days_until_due'] > 0:
            prediction_text += f" | Due date: {pregnancy_info['due_date']} ({pregnancy_info['days_until_due']} days)"
        
        return ChatResponse(
            response=ai_response,
            prediction=prediction_text,
            additional_info=pregnancy_info
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process pregnancy chat request: {str(e)}"
        )


# ============================================
# HEALTH CHECK ENDPOINT
# ============================================

@router.get("/health-check")
async def health_check():
    """
    Check if AI service is connected and working
    """
    is_connected = ai_service.test_connection()
    
    return {
        "status": "healthy" if is_connected else "unhealthy",
        "ai_service": "connected" if is_connected else "disconnected",
        "message": "Health bots are ready" if is_connected else "AI service connection issue"
    }

# End of file
