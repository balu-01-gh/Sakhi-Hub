/**
 * Offline Queue Manager
 * Stores messages when offline and sends when connection is restored
 */

const OFFLINE_QUEUE_KEY = 'offline_message_queue';

/**
 * Add message to offline queue
 */
export const addToOfflineQueue = (message, endpoint, botType) => {
    const queue = getOfflineQueue();
    queue.push({
        id: Date.now(),
        message,
        endpoint,
        botType,
        timestamp: new Date().toISOString()
    });
    saveQueue(queue);
};

/**
 * Get offline queue
 */
export const getOfflineQueue = () => {
    try {
        const saved = localStorage.getItem(OFFLINE_QUEUE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

/**
 * Process offline queue when back online
 */
export const processOfflineQueue = async (sendFunction) => {
    const queue = getOfflineQueue();
    if (queue.length === 0) return;

    const results = [];
    
    for (const item of queue) {
        try {
            const response = await sendFunction(item.endpoint, item.message);
            results.push({ success: true, item, response });
        } catch (error) {
            results.push({ success: false, item, error });
        }
    }

    // Remove successfully sent messages
    const failed = queue.filter((item, index) => !results[index].success);
    saveQueue(failed);

    return results;
};

/**
 * Clear queue
 */
export const clearOfflineQueue = () => {
    localStorage.removeItem(OFFLINE_QUEUE_KEY);
};

/**
 * Save queue
 */
const saveQueue = (queue) => {
    try {
        localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    } catch (error) {
        console.error('Error saving offline queue:', error);
    }
};

/**
 * Check online status
 */
export const isOnline = () => navigator.onLine;

/**
 * Listen for online/offline events
 */
export const setupOnlineListener = (onOnline, onOffline) => {
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
        window.removeEventListener('online', onOnline);
        window.removeEventListener('offline', onOffline);
    };
};
