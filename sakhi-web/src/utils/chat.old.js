/**
 * Real-time Chat System for SAKHI HUB
 * Handles messaging between creators and buyers
 */

// Mock WebSocket implementation (in production, use actual WebSocket server)
class MockWebSocket {
  constructor() {
    this.listeners = {};
    this.connected = false;
  }

  connect() {
    setTimeout(() => {
      this.connected = true;
      this.emit('connect', { status: 'connected' });
    }, 500);
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  send(data) {
    // Simulate server response
    setTimeout(() => {
      this.emit('message', {
        ...data,
        timestamp: new Date().toISOString(),
        status: 'delivered'
      });
    }, 300);
  }

  disconnect() {
    this.connected = false;
    this.listeners = {};
  }
}

// Initialize chat system
let socket = null;

export const initChat = () => {
  if (!socket) {
    socket = new MockWebSocket();
    socket.connect();
  }
  return socket;
};

// Send message
export const sendMessage = (chatId, message) => {
  if (!socket) {
    socket = initChat();
  }

  const messageData = {
    chatId,
    message: message.content,
    sender: message.sender,
    timestamp: new Date().toISOString(),
    type: message.type || 'text'
  };

  // Save to localStorage (in production, this would go to backend)
  saveMessageToStorage(chatId, messageData);

  // Emit through WebSocket
  socket.send(messageData);

  return messageData;
};

// Save message to localStorage
const saveMessageToStorage = (chatId, message) => {
  const key = `chat_${chatId}`;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push(message);
  localStorage.setItem(key, JSON.stringify(existing));
};

// Get chat history
export const getChatHistory = (chatId) => {
  const key = `chat_${chatId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
};

// Get all chats for current user
export const getAllChats = () => {
  const chats = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('chat_')) {
      try {
        const messages = JSON.parse(localStorage.getItem(key));
        if (messages.length > 0) {
          const chatId = key.replace('chat_', '');
          const lastMessage = messages[messages.length - 1];
          
          chats.push({
            chatId,
            lastMessage: lastMessage.message,
            lastMessageTime: lastMessage.timestamp,
            unreadCount: 0, // In production, track actual unread count
            participantName: chatId.split('_')[0] || 'Unknown'
          });
        }
      } catch (e) {
        console.error('Error parsing chat:', e);
      }
    }
  }
  return chats.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
};

// Create new chat
export const createChat = (participantId, participantName) => {
  const chatId = `${participantName.replace(/\s+/g, '_')}_${Date.now()}`;
  return chatId;
};

// Listen to messages
export const onMessage = (callback) => {
  if (!socket) {
    socket = initChat();
  }
  socket.on('message', callback);
};

// Mark messages as read
export const markAsRead = (chatId) => {
  // In production, this would update the backend
  console.log(`Marked chat ${chatId} as read`);
};

// Delete chat
export const deleteChat = (chatId) => {
  const key = `chat_${chatId}`;
  localStorage.removeItem(key);
};

// Get online status (mock implementation)
export const getOnlineStatus = (userId) => {
  // In production, check actual online status from backend
  return Math.random() > 0.5; // Randomly return online/offline for demo
};

// Typing indicator
let typingTimers = {};

export const setTyping = (chatId, isTyping) => {
  if (!socket) {
    socket = initChat();
  }

  if (isTyping) {
    socket.emit('typing', { chatId, isTyping: true });
    
    // Clear existing timer
    if (typingTimers[chatId]) {
      clearTimeout(typingTimers[chatId]);
    }
    
    // Set new timer to stop typing indicator after 3 seconds
    typingTimers[chatId] = setTimeout(() => {
      socket.emit('typing', { chatId, isTyping: false });
    }, 3000);
  } else {
    socket.emit('typing', { chatId, isTyping: false });
    if (typingTimers[chatId]) {
      clearTimeout(typingTimers[chatId]);
      delete typingTimers[chatId];
    }
  }
};

export const onTyping = (callback) => {
  if (!socket) {
    socket = initChat();
  }
  socket.on('typing', callback);
};

// Disconnect chat
export const disconnectChat = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
