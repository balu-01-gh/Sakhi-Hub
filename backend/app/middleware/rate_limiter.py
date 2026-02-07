"""
Rate limiting middleware for FastAPI
"""
from fastapi import Request, HTTPException
from datetime import datetime, timedelta
from collections import defaultdict
import asyncio

class RateLimiter:
    def __init__(self, requests: int = 100, window: int = 60):
        """
        Initialize rate limiter
        :param requests: Number of requests allowed per window
        :param window: Time window in seconds
        """
        self.requests = requests
        self.window = timedelta(seconds=window)
        self.clients = defaultdict(list)
        self.lock = asyncio.Lock()
    
    async def check_rate_limit(self, request: Request) -> bool:
        """
        Check if client has exceeded rate limit
        """
        # Get client identifier (IP address or user ID)
        client_id = request.client.host if request.client else "unknown"
        
        # Add user ID to identifier if authenticated
        if hasattr(request.state, "user_id"):
            client_id = f"{client_id}:{request.state.user_id}"
        
        async with self.lock:
            now = datetime.now()
            
            # Clean old requests
            self.clients[client_id] = [
                timestamp for timestamp in self.clients[client_id]
                if now - timestamp < self.window
            ]
            
            # Check if limit exceeded
            if len(self.clients[client_id]) >= self.requests:
                return False
            
            # Add new request
            self.clients[client_id].append(now)
            return True
    
    async def __call__(self, request: Request):
        """
        Middleware function
        """
        if not await self.check_rate_limit(request):
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please try again later."
            )


# Create different rate limiters for different endpoints
auth_limiter = RateLimiter(requests=5, window=60)  # 5 requests per minute for auth
api_limiter = RateLimiter(requests=100, window=60)  # 100 requests per minute for general API
