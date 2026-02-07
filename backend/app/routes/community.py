"""
Community API Routes

Handles community posts, discussions, and chat features.
"""

from fastapi import APIRouter, HTTPException, status
from typing import List
from datetime import datetime
from bson import ObjectId
from app.models.community import PostCreate, PostResponse, Comment
from app.socket_events import sio  # Import SocketIO instance

# Create router
router = APIRouter(prefix="/api/community", tags=["Community"])

# MongoDB database (will be initialized in main.py)
db = None

def init_db(database):
    """Initialize database connection"""
    global db
    db = database

def get_posts_collection():
    if db is not None:
        return db.posts
    return None

# ============================================
# API ENDPOINTS
# ============================================

@router.get("/posts", response_model=List[PostResponse])
async def get_posts():
    """Get all community posts"""
    collection = get_posts_collection()
    if collection is None:
        return [] # Return empty if DB not ready
        
    posts = []
    cursor = collection.find().sort("created_at", -1).limit(50)
    
    for doc in cursor:
        posts.append(PostResponse(
            id=str(doc["_id"]),
            user_name=doc.get("user_name", "Anonymous"),
            title=doc.get("title", ""),
            content=doc.get("content", ""),
            category=doc.get("category", "General"),
            likes=doc.get("likes", 0),
            comments=[Comment(**c) for c in doc.get("comments", [])],
            created_at=doc.get("created_at", datetime.utcnow())
        ))
    
    return posts

@router.post("/posts", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(post: PostCreate):
    """Create a new community post"""
    collection = get_posts_collection()
    if collection is None:
         raise HTTPException(status_code=503, detail="Database unavailable")

    new_post = post.dict()
    new_post["created_at"] = datetime.utcnow()
    new_post["likes"] = 0
    new_post["comments"] = []
    
    result = collection.insert_one(new_post)
    
    # Broadcast new post via WebSocket
    try:
        response_post = PostResponse(id=str(result.inserted_id), **new_post).dict()
        # Convert datetime to string for JSON serialization
        if 'created_at' in response_post:
            response_post['created_at'] = response_post['created_at'].isoformat()
        
        await sio.emit('new_post', response_post)
    except Exception as e:
        print(f"Socket emit failed: {e}")
    
    return PostResponse(
        id=str(result.inserted_id),
        **new_post
    )

@router.post("/posts/{post_id}/comments", response_model=PostResponse)
async def add_comment(post_id: str, comment: Comment):
    """Add a comment to a post"""
    collection = get_posts_collection()
    if collection is None:
         raise HTTPException(status_code=503, detail="Database unavailable")
         
    try:
        oid = ObjectId(post_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid post ID")

    comment_dict = comment.dict()
    
    result = collection.find_one_and_update(
        {"_id": oid},
        {"$push": {"comments": comment_dict}},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Post not found")
        
    return PostResponse(
        id=str(result["_id"]),
        user_name=result.get("user_name", "Anonymous"),
        title=result.get("title", ""),
        content=result.get("content", ""),
        category=result.get("category", "General"),
        likes=result.get("likes", 0),
        comments=[Comment(**c) for c in result.get("comments", [])],
        created_at=result.get("created_at", datetime.utcnow())
    )

@router.post("/posts/{post_id}/like", response_model=PostResponse)
async def like_post(post_id: str):
    """Like a post"""
    collection = get_posts_collection()
    if collection is None:
         raise HTTPException(status_code=503, detail="Database unavailable")
         
    try:
        oid = ObjectId(post_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid post ID")
        
    result = collection.find_one_and_update(
        {"_id": oid},
        {"$inc": {"likes": 1}},
        return_document=True
    )
    
    if not result:
        raise HTTPException(status_code=404, detail="Post not found")
        
    return PostResponse(
        id=str(result["_id"]),
        user_name=result.get("user_name", "Anonymous"),
        title=result.get("title", ""),
        content=result.get("content", ""),
        category=result.get("category", "General"),
        likes=result.get("likes", 0),
        comments=[Comment(**c) for c in result.get("comments", [])],
        created_at=result.get("created_at", datetime.utcnow())
    )
