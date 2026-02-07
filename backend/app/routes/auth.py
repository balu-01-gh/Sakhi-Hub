"""
Authentication API Routes

Handles user registration, login, and authentication
"""

from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.models.user import UserCreate, UserLogin, UserResponse, Token, TokenData, UserBase
from app.config.settings import settings
from typing import Optional

# Create router
router = APIRouter(prefix="/api/auth", tags=["Authentication"])

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# HTTP Bearer token security
security = HTTPBearer()

# MongoDB database (will be initialized in main.py)
db = None

def init_db(database):
    """Initialize database connection"""
    global db
    db = database

# ============================================
# HELPER FUNCTIONS
# ============================================

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash password"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create JWT access token"""
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=7)  # Default 7 days
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def get_user_by_phone(phone: str):
    """Get user from database by phone number"""
    return db.users.find_one({"phone": phone})

def get_user_by_id(user_id: str):
    """Get user from database by ID"""
    from bson import ObjectId
    return db.users.find_one({"_id": ObjectId(user_id)})

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current authenticated user from JWT token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        token = credentials.credentials
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        user_id: str = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception
            
        token_data = TokenData(user_id=user_id)
    except JWTError:
        raise credentials_exception
    
    user = get_user_by_id(token_data.user_id)
    if user is None:
        raise credentials_exception
    
    return user

# ============================================
# AUTHENTICATION ENDPOINTS
# ============================================

@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate):
    """
    Register a new user
    
    Creates a new user account with hashed password
    """
    try:
        # Check if user already exists
        existing_user = get_user_by_phone(user.phone)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number already registered"
            )
        
        # Hash password
        hashed_password = get_password_hash(user.password)
        
        # Create user document
        user_dict = user.model_dump(exclude={"password"})
        user_dict["hashed_password"] = hashed_password
        user_dict["created_at"] = datetime.utcnow()
        
        # Insert into database
        result = db.users.insert_one(user_dict)
        user_id = str(result.inserted_id)
        
        # Create access token
        access_token = create_access_token(data={"sub": user_id})
        
        # Get created user
        created_user = get_user_by_id(user_id)
        created_user["id"] = str(created_user.pop("_id"))
        created_user.pop("hashed_password", None)
        
        return Token(
            access_token=access_token,
            user=UserResponse(**created_user)
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create user: {str(e)}"
        )

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """
    User login
    
    Authenticates user and returns JWT token
    """
    try:
        # Get user from database
        user = get_user_by_phone(credentials.phone)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid phone number or password"
            )
        
        # Verify password
        if not verify_password(credentials.password, user["hashed_password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid phone number or password"
            )
        
        # Create access token
        user_id = str(user["_id"])
        access_token = create_access_token(data={"sub": user_id})
        
        # Prepare user response
        user["id"] = str(user.pop("_id"))
        user.pop("hashed_password", None)
        
        return Token(
            access_token=access_token,
            user=UserResponse(**user)
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """
    Get current user information
    
    Returns authenticated user's profile data
    """
    current_user["id"] = str(current_user.pop("_id"))
    current_user.pop("hashed_password", None)
    return UserResponse(**current_user)

@router.put("/me", response_model=UserResponse)
async def update_current_user(
    update_data: UserBase,
    current_user: dict = Depends(get_current_user)
):
    """
    Update current user profile
    
    Allows user to update their profile information
    """
    try:
        from bson import ObjectId
        
        # Prepare update data
        update_dict = update_data.model_dump(exclude_unset=True)
        update_dict["updated_at"] = datetime.utcnow()
        
        # Update user in database
        db.users.update_one(
            {"_id": current_user["_id"]},
            {"$set": update_dict}
        )
        
        # Get updated user
        updated_user = get_user_by_id(str(current_user["_id"]))
        updated_user["id"] = str(updated_user.pop("_id"))
        updated_user.pop("hashed_password", None)
        
        return UserResponse(**updated_user)
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update profile: {str(e)}"
        )

@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """
    User logout
    
    Note: With JWT, actual logout happens on client-side by removing token
    This endpoint is for logging/auditing purposes
    """
    return {
        "message": "Logged out successfully",
        "user": current_user.get("name")
    }
