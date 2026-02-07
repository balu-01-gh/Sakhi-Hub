"""
Skill Hub API Routes

Handles creator profiles and product management
"""

from fastapi import APIRouter, HTTPException, status, UploadFile, File
from app.models.schemas import CreatorProfile, Product, SuccessResponse, ErrorResponse
from pymongo import MongoClient
from app.config.settings import settings
from typing import List
import shutil
import os
import uuid
from datetime import datetime

# Create router
router = APIRouter(prefix="/api/skill-hub", tags=["Skill Hub"])

# MongoDB client (will be initialized in main.py)
db = None

def init_db(database):
    """Initialize database connection"""
    global db
    db = database

# ============================================
# CREATOR PROFILE ENDPOINTS
# ============================================

@router.post("/uploads/work-sample", status_code=status.HTTP_201_CREATED)
async def upload_work_sample(file: UploadFile = File(...)):
    """
    Upload a work sample image
    """
    try:
        # Create unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        
        # Define upload path (relative to app directory)
        upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static", "uploads")
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
            
        file_path = os.path.join(upload_dir, unique_filename)
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Return URL (relative path that will be served by StaticFiles)
        return {"url": f"/static/uploads/{unique_filename}"}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload image: {str(e)}"
        )

@router.post("/create-profile", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def create_creator_profile(profile: CreatorProfile):
    """
    Create a new creator profile
    
    This endpoint allows rural women to register their skills and create a profile
    """
    try:
        # Convert Pydantic model to dict
        profile_dict = profile.model_dump()
        
        # Insert into database
        result = db.creators.insert_one(profile_dict)
        
        # Return success response
        return SuccessResponse(
            message="Profile created successfully!",
            data={
                "profile_id": str(result.inserted_id),
                "name": profile.name
            }
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create profile: {str(e)}"
        )

@router.get("/creators", response_model=List[dict])
async def get_all_creators():
    """
    Get all creator profiles
    
    Returns list of all registered creators for the skill marketplace
    """
    try:
        # Fetch all creators from database
        creators_cursor = db.creators.find()
        creators = []
        
        for creator in creators_cursor:
            # Convert MongoDB ObjectId to string
            creator['_id'] = str(creator['_id'])
            # Convert datetime to string for JSON serialization
            creator['created_at'] = creator['created_at'].isoformat()
            creators.append(creator)
        
        return creators
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch creators: {str(e)}"
        )

@router.get("/creator/{creator_id}")
async def get_creator_by_id(creator_id: str):
    """
    Get specific creator profile by ID
    """
    try:
        from bson import ObjectId
        
        creator = db.creators.find_one({"_id": ObjectId(creator_id)})
        
        if not creator:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Creator not found"
            )
        
        # Convert ObjectId and datetime
        creator['_id'] = str(creator['_id'])
        creator['created_at'] = creator['created_at'].isoformat()
        
        return creator
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch creator: {str(e)}"
        )

# ============================================
# PRODUCT ENDPOINTS
# ============================================

@router.post("/add-product", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def add_product(product: Product):
    """
    Add a new product to the marketplace
    
    Allows creators to list their handmade products for sale
    """
    try:
        # Convert Pydantic model to dict
        product_dict = product.model_dump()
        
        # Insert into database
        result = db.products.insert_one(product_dict)
        
        # Return success response
        return SuccessResponse(
            message="Product added successfully!",
            data={
                "product_id": str(result.inserted_id),
                "product_name": product.product_name
            }
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to add product: {str(e)}"
        )

@router.get("/products", response_model=List[dict])
async def get_all_products():
    """
    Get all products from marketplace
    
    Returns list of all available products
    """
    try:
        # Fetch only available products
        products_cursor = db.products.find({"available": True})
        products = []
        
        for product in products_cursor:
            # Convert MongoDB ObjectId to string
            product['_id'] = str(product['_id'])
            # Convert datetime to string
            product['created_at'] = product['created_at'].isoformat()
            products.append(product)
        
        return products
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch products: {str(e)}"
        )

@router.get("/products/creator/{creator_name}")
async def get_products_by_creator(creator_name: str):
    """
    Get all products by a specific creator
    """
    try:
        products_cursor = db.products.find({"creator_name": creator_name, "available": True})
        products = []
        
        for product in products_cursor:
            product['_id'] = str(product['_id'])
            product['created_at'] = product['created_at'].isoformat()
            products.append(product)
        
        return products
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch creator products: {str(e)}"
        )
