"""
User Model Schema

Defines the user data structure for authentication and user management
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    """Base user fields"""
    phone: str = Field(..., description="User phone number (unique identifier)")
    name: str = Field(..., description="User's full name")
    email: Optional[EmailStr] = None
    village: Optional[str] = None
    is_creator: bool = Field(default=False, description="Whether user is a creator/artisan")

class UserCreate(UserBase):
    """User creation schema - includes password"""
    password: str = Field(..., min_length=6, description="User password (min 6 characters)")

class UserLogin(BaseModel):
    """User login schema"""
    phone: str = Field(..., description="User phone number")
    password: str = Field(..., description="User password")

class UserResponse(UserBase):
    """User response schema - excludes password"""
    id: str = Field(..., description="User ID")
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class TokenData(BaseModel):
    """Token payload data"""
    phone: Optional[str] = None
    user_id: Optional[str] = None
