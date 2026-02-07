"""
AI Service - Google Gemini Integration

Handles communication with Google AI Studio (Gemini API) for both chatbots
Manages system prompts and context injection
"""

import google.generativeai as genai
from app.config.settings import settings
from app.prompts.period_bot_prompt import PERIOD_CARE_SYSTEM_PROMPT, get_period_context_prompt
from app.prompts.pregnancy_bot_prompt import PREGNANCY_CARE_SYSTEM_PROMPT, get_pregnancy_context_prompt
from typing import List, Dict
import time

# Configure Google AI with API key
genai.configure(api_key=settings.GOOGLE_API_KEY)

# Initialize Gemini model
model = genai.GenerativeModel(settings.GEMINI_MODEL)

class AIService:
    """Service class for AI chatbot interactions"""
    
    @staticmethod
    def _make_api_call_with_retry(prompt: str, max_retries: int = 2):
        """
        Make API call with retry logic for rate limits
        
        Args:
            prompt: The full prompt to send
            max_retries: Maximum number of retries
            
        Returns:
            API response text
        """
        for attempt in range(max_retries + 1):
            try:
                response = model.generate_content(
                    prompt,
                    generation_config=genai.types.GenerationConfig(
                        temperature=0.9,
                        max_output_tokens=1500,  # Slightly reduced to save quota
                        top_p=0.95,
                    )
                )
                return response.text.strip()
            except Exception as e:
                error_message = str(e)
                print(f"❌ API Error (Attempt {attempt + 1}/{max_retries + 1}): {error_message}")
                
                # Check if it's a rate limit error
                if "429" in error_message or "quota" in error_message.lower():
                    if attempt < max_retries:
                        # Wait a bit before retrying
                        time.sleep(2 ** attempt)  # Exponential backoff: 1s, 2s, 4s
                        continue
                    else:
                        return "Oh dear! I'm getting a lot of questions right now and need a short break. Could you please try again in a few seconds? I promise I'll be right here waiting to help you!"
                else:
                    # Other errors - log details
                    print(f"❌ Non-rate-limit error: {type(e).__name__}: {error_message}")
                    return f"I'm having a small technical hiccup right now. Please try again in a moment. If this keeps happening, please let someone know so they can help fix it!"
        
        return "I'm having trouble responding right now. Please try again shortly!"
    
    @staticmethod
    async def get_period_chat_response(
        user_message: str,
        age: int,
        last_period_date: str,
        next_period_prediction: str,
        days_since: int
    ) -> str:
        """
        Get response from Period Care Bot
        
        Args:
            user_message: User's question or concern
            age: User's age
            last_period_date: Date of last period
            next_period_prediction: Calculated next period date
            days_since: Days since last period
            
        Returns:
            AI-generated response string
        """
        try:
            # Build context-aware system prompt
            context_prompt = get_period_context_prompt(
                age=age,
                last_period_date=last_period_date,
                next_period_prediction=next_period_prediction,
                days_since=days_since
            )
            
            # Combine system prompt with context and user message
            full_prompt = f"""{PERIOD_CARE_SYSTEM_PROMPT}

{context_prompt}

User's Message: {user_message}

Respond as a caring friend. Be warm, empathetic, and conversational. Answer their question completely and thoroughly. If they're sharing pain or discomfort, comfort them first. Make them feel heard and supported:"""
            
            # Call API with retry logic
            return AIService._make_api_call_with_retry(full_prompt)
            
        except Exception as e:
            # Handle unexpected errors gracefully
            return "I'm having a small technical hiccup right now. Please try again in a moment! I'm here for you. 💕"
    
    @staticmethod
    async def get_pregnancy_chat_response(
        user_message: str,
        confirmation_date: str,
        weeks_pregnant: int,
        trimester: str,
        due_date: str
    ) -> str:
        """
        Get response from Pregnancy Care Bot
        
        Args:
            user_message: User's question or concern
            confirmation_date: Pregnancy confirmation date
            weeks_pregnant: Current pregnancy week
            trimester: Current trimester
            due_date: Estimated due date
            
        Returns:
            AI-generated response string
        """
        try:
            # Build context-aware system prompt
            context_prompt = get_pregnancy_context_prompt(
                confirmation_date=confirmation_date,
                weeks_pregnant=weeks_pregnant,
                trimester=trimester,
                due_date=due_date
            )
            
            # Combine system prompt with context and user message
            full_prompt = f"""{PREGNANCY_CARE_SYSTEM_PROMPT}

{context_prompt}

User's Message: {user_message}

Respond as a caring friend. Be warm, empathetic, and conversational. Answer their question completely and thoroughly. If they're sharing pain or discomfort, comfort them first. Make them feel heard and supported:"""
            
            # Call API with retry logic
            return AIService._make_api_call_with_retry(full_prompt)
            
        except Exception as e:
            # Handle unexpected errors gracefully
            return "I'm having a small technical hiccup right now. Please try again in a moment! I'm here for you. 💕"
    
    @staticmethod
    async def get_chat_response(user_message: str, system_prompt: str) -> str:
        """
        Generic chat response method for any bot with custom system prompt
        
        Args:
            user_message: User's question or message
            system_prompt: Custom system prompt for the specific bot
            
        Returns:
            AI-generated response string
        """
        try:
            # Combine system prompt with user message
            full_prompt = f"""{system_prompt}

User's Message: {user_message}

Respond warmly and helpfully:"""
            
            # Call API with retry logic
            return AIService._make_api_call_with_retry(full_prompt)
            
        except Exception as e:
            # Handle unexpected errors gracefully
            return "I'm having a small technical hiccup right now. Please try again in a moment!"
    
    @staticmethod
    def test_connection() -> bool:
        """
        Test Google Gemini API connection
        
        Returns:
            True if connection successful, False otherwise
        """
        try:
            response = model.generate_content(
                "test",
                generation_config=genai.types.GenerationConfig(max_output_tokens=5)
            )
            return True
        except Exception as e:
            print(f"Google Gemini connection test failed: {e}")
            return False
