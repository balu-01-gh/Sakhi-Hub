
import socketio
from typing import Dict, List

# Create Socket.IO server
# async_mode='asgi' is compatible with FastAPI
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',  # Allow all origins for development
    logger=True,
    engineio_logger=True
)

# Store active users: {socket_id: user_id}
active_users: Dict[str, str] = {}
# Store active rooms/chats
active_chats: Dict[str, List[str]] = {}

@sio.event
async def connect(sid, environ):
    """Handle new connection"""
    print(f"🔌 Socket connected: {sid}")
    await sio.emit('connect_ack', {'status': 'connected', 'sid': sid}, to=sid)

@sio.event
async def disconnect(sid):
    """Handle disconnection"""
    user_id = active_users.pop(sid, None)
    print(f"🔌 Socket disconnected: {sid} (User: {user_id})")
    
    # Broadcast user offline status if they were logged in
    if user_id:
        await sio.emit('user_status', {'userId': user_id, 'status': 'offline'})

@sio.event
async def join_chat(sid, data):
    """User joins a specific chat room"""
    room_id = data.get('roomId')
    user_id = data.get('userId')
    
    if user_id:
        active_users[sid] = user_id
        
    if room_id:
        sio.enter_room(sid, room_id)
        print(f"👤 User {user_id} joined room {room_id}")
        await sio.emit('user_joined', {'userId': user_id}, room=room_id)

@sio.event
async def send_message(sid, data):
    """Handle sending a message"""
    room_id = data.get('roomId')
    message = data.get('message')
    sender_id = data.get('senderId')
    
    if room_id and message:
        # Broadcast to everyone in the room except sender (or including? usually including for confirmation, or just broadcast)
        # In a real app, save to DB here
        
        timestamp = data.get('timestamp')
        
        response_data = {
            'id': data.get('id'), # echo back ID
            'text': message,
            'senderId': sender_id,
            'timestamp': timestamp,
            'status': 'sent'
        }
        
        # Emit to the room
        await sio.emit('receive_message', response_data, room=room_id)
        print(f"📨 Message sent in room {room_id}: {message[:20]}...")

@sio.event
async def share_location(sid, data):
    """Handle location sharing for SOS/Safety"""
    # Broadcast to safety circle (simulated by a room or global for demo)
    user_id = data.get('userId')
    location = data.get('location') # {lat, lng}
    
    if location:
        print(f"📍 Location shared by {user_id}: {location}")
        # Broadcast to 'safety_monitoring' room or similar
        await sio.emit('emergency_location', {
            'userId': user_id,
            'location': location,
            'timestamp': data.get('timestamp')
        })
