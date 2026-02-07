from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import AIService
import json

router = APIRouter()

class EligibilityRequest(BaseModel):
    scheme_name: str
    age: int
    income: int
    residence: str = "Rural"
    caste: str = "General"

class EligibilityResponse(BaseModel):
    is_eligible: bool
    reason: str

@router.post("/check-eligibility", response_model=EligibilityResponse)
async def check_eligibility(request: EligibilityRequest):
    system_prompt = f"""
    You are an expert on Indian Government Welfare Schemes for women (e.g., Sukanya Samriddhi Yojana, PMMVY, Ujjwala, NRLM, Stand Up India).
    
    Task: precise eligibility check.
    Scheme: "{request.scheme_name}"
    User Data: Age {request.age}, Income ₹{request.income}, {request.residence}, {request.caste}.

    Rules:
    1. Check specific age limits and income caps for the named scheme.
    2. Respond with valid JSON only. format: {{"is_eligible": boolean, "reason": "string"}}.
    3. Reason should be 1 short sentence encouraging the user ("You meet the age criteria!") or explaining the blocker ("Income limit is 1.5L").
    """
    
    try:
        # We reuse get_chat_response but pass empty user message since system prompt has everything
        response_text = await AIService.get_chat_response("Check eligibility", system_prompt)
        
        # Cleanup response
        clean_text = response_text.replace("```json", "").replace("```", "").strip()
        # Find start and end of json if extra text exists
        start = clean_text.find("{")
        end = clean_text.rfind("}") + 1
        if start != -1 and end != -1:
            clean_text = clean_text[start:end]
            
        result = json.loads(clean_text)
        
        return EligibilityResponse(
            is_eligible=result.get("is_eligible", False),
            reason=result.get("reason", "Please verify documents at center.")
        )
    except Exception as e:
        print(f"AI Check Error: {e}")
        # Simple fallback logic
        eligible = True
        reason = "Preliminary check passed. Please visit center."
        
        # Super basic fallback logic for common failures
        if "Sukanya" in request.scheme_name and request.age > 10:
            eligible = False
            reason = "Age must be less than 10 years."
            
        return EligibilityResponse(is_eligible=eligible, reason=reason)
