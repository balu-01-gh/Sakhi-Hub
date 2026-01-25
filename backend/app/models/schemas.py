"""
Database Schemas and Models for SAKHI HUB

This file defines the data structures used throughout the application:
1. Creator Profiles
2. Products
3. Health Bot Interactions
"""

from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime

# ============================================
# SKILL HUB SCHEMAS
# ============================================

class CreatorProfile(BaseModel):
    """
    Creator Profile Model
    Represents a rural woman showcasing her skills
    """
    name: str = Field(..., min_length=2, max_length=100, description="Creator's full name")
    village: str = Field(..., min_length=2, max_length=100, description="Village name")
    skill_category: str = Field(..., description="Primary skill: Tailoring, Art, Cooking, Farming, Handicrafts")
    experience: str = Field(..., min_length=10, max_length=1000, description="About/Experience description")
    work_samples: List[str] = Field(default=[], description="List of image URLs showcasing work")
    contact_number: Optional[str] = Field(None, description="Contact phone number")
    email: Optional[EmailStr] = Field(None, description="Email address")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Radha Devi",
                "village": "Rampur",
                "skill_category": "Handicrafts",
                "experience": "I have been making traditional handicrafts for 10 years. I specialize in pottery and decorative items.",
                "work_samples": [
                    "https://example.com/pottery1.jpg",
                    "https://example.com/pottery2.jpg"
                ],
                "contact_number": "+91-9876543210",
                "email": "radha@example.com"
            }
        }

class Product(BaseModel):
    """
    Product Model
    Represents handmade products created by rural women
    """
    product_name: str = Field(..., min_length=3, max_length=200, description="Name of the product")
    creator_name: str = Field(..., description="Name of the creator")
    price: float = Field(..., gt=0, description="Price in INR")
    description: str = Field(..., min_length=10, max_length=500, description="Product description")
    image_url: str = Field(..., description="Product image URL")
    category: str = Field(..., description="Product category")
    available: bool = Field(default=True, description="Product availability status")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "product_name": "Handmade Clay Pot",
                "creator_name": "Radha Devi",
                "price": 250.00,
                "description": "Beautiful traditional clay pot, handcrafted with natural clay",
                "image_url": "https://example.com/clay-pot.jpg",
                "category": "Handicrafts"
            }
        }

# ============================================
# HEALTH BOT SCHEMAS
# ============================================

class PeriodChatRequest(BaseModel):
    """
    Request model for Period Care Bot
    """
    age: int = Field(..., ge=10, le=60, description="User's age")
    last_period_date: str = Field(..., description="Last period date in YYYY-MM-DD format")
    message: str = Field(..., min_length=1, max_length=1000, description="User's question/message")
    
    class Config:
        json_schema_extra = {
            "example": {
                "age": 25,
                "last_period_date": "2026-01-10",
                "message": "I have severe cramps. What can I do?"
            }
        }

class PregnancyChatRequest(BaseModel):
    """
    Request model for Pregnancy Care Bot
    """
    pregnancy_confirmation_date: str = Field(..., description="Pregnancy confirmation date in YYYY-MM-DD format")
    message: str = Field(..., min_length=1, max_length=1000, description="User's question/message")
    
    class Config:
        json_schema_extra = {
            "example": {
                "pregnancy_confirmation_date": "2025-11-01",
                "message": "What foods should I eat in my second trimester?"
            }
        }

class ChatResponse(BaseModel):
    """
    Response model for both chatbots
    """
    response: str = Field(..., description="AI-generated response")
    prediction: Optional[str] = Field(None, description="Prediction (next period date, trimester info, etc.)")
    additional_info: Optional[dict] = Field(None, description="Additional calculated information")
    
    class Config:
        json_schema_extra = {
            "example": {
                "response": "For menstrual cramps, try gentle exercises like walking...",
                "prediction": "Next period expected: 2026-02-07",
                "additional_info": {
                    "cycle_day": 15,
                    "days_until_next": 13
                }
            }
        }

# ============================================
# RESPONSE MODELS
# ============================================

class SuccessResponse(BaseModel):
    """Generic success response"""
    success: bool = True
    message: str
    data: Optional[dict] = None

class ErrorResponse(BaseModel):
    """Generic error response"""
    success: bool = False
    error: str
    detail: Optional[str] = None
