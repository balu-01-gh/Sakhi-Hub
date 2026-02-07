/**
 * Real-time Chat System for SAKHI HUB
 * Handles messaging between creators and buyers using Socket.IO
 */

import io from 'socket.io-client';
import { getAuthToken, getUserData } from './auth';

// API URL from environment env or default
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ChatService {
  constructor() {
    this.socket = null;
    this.listeners = {};
  }

  init() {
    if (this.socket) return this.socket;

    const token = getAuthToken();
    const user = getUserData();

    // Initialize Socket.IO connection
    this.socket = io(SOCKET_URL, {
      auth: {
        token: token
      },
      query: {
        userId: user?.id
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket']
    });

    this.setupListeners();
    return this.socket;
  }

  setupListeners() {
    this.socket.on('connect', () => {
      console.log('✅ Connected to Chat Server');
      this.emitInternal('connect', { status: 'connected', id: this.socket.id });
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from Chat Server');
      this.emitInternal('disconnect', { status: 'disconnected' });
    });

    this.socket.on('receive_message', (data) => {
      console.log('📩 Message received:', data);
      this.emitInternal('message', data);
    });
    
    this.socket.on('emergency_location', (data) => {
        console.log('🚨 Emergency Location Alert:', data);
        this.emitInternal('emergency_location', data);
    });

    this.socket.on('new_post', (data) => {
      console.log('📰 New Community Post:', data);
      this.emitInternal('new_community_post', data);
    });
  }

  // Internal event emitter for UI components to subscribe to
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    
    // If we're already connected and asking for connect, fire immediately
    if (event === 'connect' && this.socket?.connected) {
        callback({ status: 'connected', id: this.socket.id });
    }
  }
  
  off(event, callback) {
      if (this.listeners[event]) {
          this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
      }
  }

  emitInternal(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  joinRoom(roomId) {
      if (!this.socket) this.init();
      this.socket.emit('join_chat', { roomId });
  }

  sendMessage(roomId, messageContent, senderId) {
    if (!this.socket) this.init();

    const timestamp = new Date().toISOString();
    const messageData = {
      roomId,
      message: messageContent,
      senderId,
      timestamp
    };

    // Emit to server
    this.socket.emit('send_message', messageData);
    
    // Return optimistic message for UI
    return {
        ...messageData,
        status: 'sending'
    };
  }
  
  shareLocation(userId, location) {
      if (!this.socket) this.init();
      this.socket.emit('share_location', {
          userId,
          location,
          timestamp: new Date().toISOString()
      });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

// Singleton instance
const chatService = new ChatService();

// Export wrapper functions to maintain compatibility with existing code where possible
export const initChat = () => {
  return chatService.init();
};

export const joinChatRoom = (roomId) => {
    chatService.joinRoom(roomId);
};

export const sendMessage = (chatId, message) => {
  // Adaptation logic for existing calls: 
  // message object usually has { content, sender, type }
  // We treat chatId as roomId
  const user = getUserData();
  const senderId = user?.id || 'anonymous';
  
  const msgObj = chatService.sendMessage(chatId, message.content, senderId);
  
  // Also save to local storage for offline viewing/history
  saveMessageToStorage(chatId, {
      chatId,
      message: message.content,
      sender: message.sender, // 'me' or 'them' - usually 'me' when sending
      timestamp: msgObj.timestamp,
      type: message.type || 'text'
  });
  
  return msgObj;
};

// Helper: Save message to localStorage (legacy support)
const saveMessageToStorage = (chatId, message) => {
  const key = `chat_${chatId}`;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push(message);
  localStorage.setItem(key, JSON.stringify(existing));
};

export const getChatHistory = (chatId) => {
  const key = `chat_${chatId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const getAllChats = () => {
  // This is a mock function in original code too, relying on localStorage keys
  const chats = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('chat_')) {
      const chatId = key.replace('chat_', '');
      const history = JSON.parse(localStorage.getItem(key));
      const lastMessage = history[history.length - 1];
      if (lastMessage) {
        chats.push({
            id: chatId,
            lastMessage: lastMessage.message,
            timestamp: lastMessage.timestamp,
            unreadCount: 0,
            participantName: chatId.split('_')[0] || 'User'
        });
      }
    }
  }
  return chats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Other exports to satisfy imports
export const onMessage = (cb) => chatService.on('message', cb);
export const onCommunityPost = (cb) => chatService.on('new_community_post', cb);
export const onTyping = (cb) => {}; // No-op for now
export const setTyping = () => {}; // No-op
export const getOnlineStatus = () => true;
export const createChat = (id, name) => `${name}_${Date.now()}`;
export const markAsRead = () => {};
export const deleteChat = () => {};


export default chatService;
