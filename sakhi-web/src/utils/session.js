// Session timeout manager

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 5 * 60 * 1000; // Show warning 5 minutes before timeout

let timeoutTimer = null;
let warningTimer = null;
let lastActivity = Date.now();

/**
 * Initialize session timeout tracking
 */
export const initSessionTimeout = (onWarning, onTimeout) => {
    // Clear existing timers
    clearSessionTimers();
    
    // Update last activity
    lastActivity = Date.now();
    
    // Set warning timer
    warningTimer = setTimeout(() => {
        if (onWarning) onWarning();
    }, SESSION_TIMEOUT - WARNING_TIME);
    
    // Set timeout timer
    timeoutTimer = setTimeout(() => {
        if (onTimeout) onTimeout();
    }, SESSION_TIMEOUT);
    
    // Listen for user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
        document.addEventListener(event, resetSessionTimeout);
    });
};

/**
 * Reset session timeout on user activity
 */
const resetSessionTimeout = () => {
    const now = Date.now();
    // Only reset if more than 1 minute has passed since last activity
    if (now - lastActivity > 60000) {
        lastActivity = now;
        clearSessionTimers();
        // Note: You'll need to call initSessionTimeout again from your component
    }
};

/**
 * Clear all session timers
 */
export const clearSessionTimers = () => {
    if (timeoutTimer) clearTimeout(timeoutTimer);
    if (warningTimer) clearTimeout(warningTimer);
};

/**
 * Get time remaining in session
 */
export const getSessionTimeRemaining = () => {
    const elapsed = Date.now() - lastActivity;
    const remaining = SESSION_TIMEOUT - elapsed;
    return Math.max(0, remaining);
};

/**
 * Extend session
 */
export const extendSession = (onWarning, onTimeout) => {
    initSessionTimeout(onWarning, onTimeout);
};
