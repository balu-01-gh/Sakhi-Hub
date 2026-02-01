/**
 * Chat History Management
 * Saves and retrieves chat conversations from localStorage
 */

const CHAT_HISTORY_KEY = 'sakhi_chat_history';
const MAX_HISTORY_DAYS = 30; // Keep history for 30 days

/**
 * Save chat message to history
 */
export const saveChatMessage = (botType, message) => {
    try {
        const history = getChatHistory(botType);
        history.push({
            ...message,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 messages per bot
        const trimmedHistory = history.slice(-100);
        
        const allHistory = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || '{}');
        allHistory[botType] = trimmedHistory;
        
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(allHistory));
    } catch (error) {
        console.error('Error saving chat history:', error);
    }
};

/**
 * Get chat history for a specific bot
 */
export const getChatHistory = (botType) => {
    try {
        const allHistory = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || '{}');
        return allHistory[botType] || [];
    } catch (error) {
        console.error('Error loading chat history:', error);
        return [];
    }
};

/**
 * Clear chat history for a specific bot
 */
export const clearChatHistory = (botType) => {
    try {
        const allHistory = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || '{}');
        delete allHistory[botType];
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(allHistory));
    } catch (error) {
        console.error('Error clearing chat history:', error);
    }
};

/**
 * Clear all chat history
 */
export const clearAllChatHistory = () => {
    try {
        localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch (error) {
        console.error('Error clearing all chat history:', error);
    }
};

/**
 * Export chat history as text
 */
export const exportChatHistory = (botType) => {
    const history = getChatHistory(botType);
    if (history.length === 0) {
        return null;
    }
    
    let text = `Chat History - ${botType}\n`;
    text += `Exported: ${new Date().toLocaleString()}\n`;
    text += '='.repeat(50) + '\n\n';
    
    history.forEach((msg, index) => {
        const time = new Date(msg.timestamp).toLocaleString();
        text += `[${time}] ${msg.role === 'user' ? 'You' : 'Assistant'}:\n`;
        text += `${msg.content}\n\n`;
    });
    
    return text;
};

/**
 * Download chat history as file
 */
export const downloadChatHistory = (botType) => {
    const text = exportChatHistory(botType);
    if (!text) {
        alert('No chat history to export');
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${botType}-chat-history-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
