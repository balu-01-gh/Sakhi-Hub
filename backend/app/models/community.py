from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Comment(BaseModel):
    user_name: str
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class PostCreate(BaseModel):
    user_name: str
    title: str
    content: str
    category: Optional[str] = "General"

class PostResponse(PostCreate):
    id: str
    likes: int = 0
    comments: List[Comment] = []
    created_at: datetime
    
    class Config:
        from_attributes = True
