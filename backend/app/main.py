"""
SAKHI HUB - Main FastAPI Application

This is the entry point for the backend server.
It initializes the FastAPI app, connects to MongoDB, and registers all routes.
"""

from fastapi import FastAPI, status, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from app.config.settings import settings
from app.routes import skill_hub, health_bots, auth, community, krishi_bot, schemes
from app.middleware.rate_limiter import api_limiter, auth_limiter
from app.socket_events import sio
import socketio
import uvicorn

# ============================================
# CREATE FASTAPI APP
# ============================================

fastapi_app = FastAPI(
    title="SAKHI HUB API",
    description="Backend API for Rural Women Empowerment Platform - Skill Hub + Health Care Assistant",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc",  # ReDoc UI
    dependencies=[Depends(api_limiter)]  # Global rate limit
)

# ============================================
# CONFIGURE CORS
# ============================================

# Allow frontend to communicate with backend
fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# ============================================
# MOUNT STATIC FILES
# ============================================
import os
static_path = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(static_path):
    os.makedirs(static_path)
    
fastapi_app.mount("/static", StaticFiles(directory=static_path), name="static")

# ============================================
# DATABASE CONNECTION
# ============================================

# Global database instance
db = None
mongo_client = None

@fastapi_app.on_event("startup")
async def startup_db_client():
    """
    Initialize MongoDB connection on application startup
    """
    global db, mongo_client
    
    try:
        # Connect to MongoDB with shorter timeout
        mongo_client = MongoClient(settings.MONGODB_URL, serverSelectionTimeoutMS=5000)
        
        # Test connection
        mongo_client.admin.command('ping')
        print("✅ Successfully connected to MongoDB")
        
        # Get database
        db = mongo_client[settings.DATABASE_NAME]
        
        # Initialize database in route modules
        skill_hub.init_db(db)
        auth.init_db(db)
        community.init_db(db)
        
        # Create indexes for better performance
        db.users.create_index("phone", unique=True)
        db.creators.create_index("name")
        db.creators.create_index("skill_category")
        db.products.create_index("creator_name")
        db.products.create_index("category")
        
        print(f"✅ Database '{settings.DATABASE_NAME}' initialized")
        
    except ConnectionFailure as e:
        print(f"⚠️  MongoDB not available: {e}")
        print("⚠️  Server will start but database features won't work.")
        print("⚠️  Install and start MongoDB to enable authentication and data storage.")
    except Exception as e:
        print(f"⚠️  Database initialization error: {e}")

@fastapi_app.on_event("shutdown")
async def shutdown_db_client():
    """
    Close MongoDB connection on application shutdown
    """
    global mongo_client
    
    if mongo_client:
        mongo_client.close()
        print("✅ MongoDB connection closed")

# ============================================
# REGISTER ROUTES
# ============================================

# Include Authentication routes
fastapi_app.include_router(auth.router, dependencies=[Depends(auth_limiter)])

# Include Skill Hub routes
fastapi_app.include_router(skill_hub.router)

# Include Health Bots routes
fastapi_app.include_router(health_bots.router)

# Include Community routes
fastapi_app.include_router(community.router)

# Include Schemes routes
fastapi_app.include_router(schemes.router, prefix="/api/schemes", tags=["Schemes"])

# Include Krishi Bot routes
fastapi_app.include_router(krishi_bot.router)

# ============================================
# ROOT ENDPOINT
# ============================================

@fastapi_app.get("/", status_code=status.HTTP_200_OK)
async def root():
    """
    Root endpoint - API welcome message
    """
    return {
        "message": "🌸 Welcome to SAKHI HUB API",
        "tagline": "Empowering Rural Women Through Technology",
        "version": "1.0.0",
        "sections": {
            "skill_hub": "Showcase skills, find work, sell products",
            "health_assistant": "Period care and pregnancy guidance"
        },
        "docs": {
            "swagger_ui": "/docs",
            "redoc": "/redoc"
        },
        "status": "running"
    }

@fastapi_app.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    """
    Health check endpoint - verify API is running
    """
    db_status = "connected" if db is not None else "disconnected"
    
    return {
        "status": "healthy",
        "database": db_status,
        "message": "SAKHI HUB API is running smoothly"
    }

# ============================================
# SEED DATA FOR DEMO (OPTIONAL)
# ============================================

@fastapi_app.post("/seed-demo-data", status_code=status.HTTP_201_CREATED)
async def seed_demo_data():
    """
    Seed database with demo data for hackathon presentation
    This is useful for quick setup during demo
    """
    try:
        # Check if data already exists
        if db.creators.count_documents({}) > 0:
            return {
                "message": "Demo data already exists",
                "creators": db.creators.count_documents({}),
                "products": db.products.count_documents({})
            }
        
        # Demo creators
        demo_creators = [
            {
                "name": "Radha Devi",
                "village": "Rampur",
                "skill_category": "Handicrafts",
                "experience": "I have been making traditional pottery and decorative clay items for 10 years. I learned this skill from my mother and now I teach other women in my village.",
                "work_samples": [
                    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400",
                    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400"
                ],
                "contact_number": "+91-9876543210",
                "email": "radha@example.com",
                "created_at": "2026-01-15T10:00:00"
            },
            {
                "name": "Sunita Kumari",
                "village": "Bhopal Khurd",
                "skill_category": "Tailoring",
                "experience": "Experienced tailor specializing in traditional Indian clothing. I can stitch sarees, salwar kameez, and modern garments. 8 years of experience.",
                "work_samples": [
                    "https://images.unsplash.com/photo-1610652492918-034f2b0c86a0?w=400",
                    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400"
                ],
                "contact_number": "+91-9876543211",
                "email": "sunita@example.com",
                "created_at": "2026-01-16T10:00:00"
            },
            {
                "name": "Meera Bai",
                "village": "Sitapur",
                "skill_category": "Art",
                "experience": "Traditional Madhubani painting artist. I create beautiful wall art, home decor items, and custom paintings. I also conduct workshops.",
                "work_samples": [
                    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
                    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400"
                ],
                "contact_number": "+91-9876543212",
                "email": "meera@example.com",
                "created_at": "2026-01-17T10:00:00"
            }
        ]
        
        # Demo products
        demo_products = [
            {
                "product_name": "Handmade Clay Pot Set",
                "creator_name": "Radha Devi",
                "price": 450.00,
                "description": "Beautiful set of 3 traditional clay pots, handcrafted with natural clay. Perfect for home decor and plants.",
                "image_url": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400",
                "category": "Handicrafts",
                "available": True,
                "created_at": "2026-01-18T10:00:00"
            },
            {
                "product_name": "Custom Embroidered Kurta",
                "creator_name": "Sunita Kumari",
                "price": 1200.00,
                "description": "Elegant cotton kurta with traditional embroidery work. Available in all sizes. Custom orders welcome.",
                "image_url": "https://images.unsplash.com/photo-1610652492918-034f2b0c86a0?w=400",
                "category": "Clothing",
                "available": True,
                "created_at": "2026-01-18T10:00:00"
            },
            {
                "product_name": "Madhubani Wall Art",
                "creator_name": "Meera Bai",
                "price": 800.00,
                "description": "Traditional Madhubani painting on canvas. Vibrant colors and intricate designs. Size: 12x16 inches.",
                "image_url": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
                "category": "Art",
                "available": True,
                "created_at": "2026-01-18T10:00:00"
            }
        ]
        
        # Insert data
        from datetime import datetime
        
        # Convert date strings to datetime objects
        for creator in demo_creators:
            creator['created_at'] = datetime.fromisoformat(creator['created_at'])
        for product in demo_products:
            product['created_at'] = datetime.fromisoformat(product['created_at'])
        
        creators_result = db.creators.insert_many(demo_creators)
        products_result = db.products.insert_many(demo_products)
        
        return {
            "message": "✅ Demo data seeded successfully!",
            "creators_added": len(creators_result.inserted_ids),
            "products_added": len(products_result.inserted_ids),
            "note": "You can now test the Skill Hub features"
        }
    
    except Exception as e:
        return {
            "error": f"Failed to seed data: {str(e)}"
        }

# ============================================
# MOUNT SOCKET.IO APP
# ============================================

# Wrap FastAPI app with Socket.IO
app = socketio.ASGIApp(sio, fastapi_app)

# ============================================
# RUN APPLICATION
# ============================================

if __name__ == "__main__":
    # Run the server
    uvicorn.run(
        "app.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=False  # Disabled reload to avoid multiprocessing issues
    )
