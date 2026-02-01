/**
 * Emergency SOS System
 * Sends emergency alerts to safety circle contacts
 */

/**
 * Send SOS alert to all contacts in safety circle
 */
export const sendSOSAlert = async (userLocation = null) => {
    const safetyCircle = getSafetyCircle();
    
    if (safetyCircle.length === 0) {
        return {
            success: false,
            message: 'No contacts in your safety circle. Please add contacts first.'
        };
    }

    // Get user's location if not provided
    let location = userLocation;
    if (!location) {
        try {
            location = await getCurrentLocation();
        } catch (error) {
            location = { error: 'Location unavailable' };
        }
    }

    const userName = getUserName();
    const timestamp = new Date().toLocaleString('en-IN');
    
    // Prepare SOS message
    const message = `🚨 EMERGENCY ALERT 🚨\n\n${userName} has triggered an SOS!\n\nTime: ${timestamp}\nLocation: ${location.error || `Lat: ${location.latitude}, Long: ${location.longitude}`}\n\nPlease check on them immediately!\n\n- SAKHI HUB Safety System`;

    // In a real app, this would call backend API to send SMS
    // For now, we'll simulate the alert
    const results = [];
    
    for (const contact of safetyCircle) {
        try {
            // Simulate SMS sending
            await simulateSMSSend(contact.phone, message);
            results.push({
                contact: contact.name,
                phone: contact.phone,
                status: 'sent',
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            results.push({
                contact: contact.name,
                phone: contact.phone,
                status: 'failed',
                error: error.message
            });
        }
    }

    // Save SOS event to history
    saveSOSEvent({
        timestamp: new Date().toISOString(),
        location,
        contactsNotified: results.filter(r => r.status === 'sent').length,
        totalContacts: safetyCircle.length
    });

    return {
        success: true,
        message: `SOS sent to ${results.filter(r => r.status === 'sent').length} contact(s)`,
        results
    };
};

/**
 * Get current location using browser geolocation API
 */
const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
};

/**
 * Simulate SMS sending (in production, this would call a backend API)
 */
const simulateSMSSend = (phone, message) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`📱 SMS to ${phone}:`, message);
            resolve();
        }, 500);
    });
};

/**
 * Get safety circle from localStorage
 */
export const getSafetyCircle = () => {
    try {
        const saved = localStorage.getItem('safety_circle');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

/**
 * Get user name from auth data
 */
const getUserName = () => {
    try {
        const userData = localStorage.getItem('user_data');
        if (userData) {
            const user = JSON.parse(userData);
            return user.name || 'User';
        }
    } catch {}
    return 'User';
};

/**
 * Save SOS event to history
 */
const saveSOSEvent = (event) => {
    try {
        const history = getSOSHistory();
        history.unshift(event); // Add to beginning
        
        // Keep only last 50 events
        const trimmed = history.slice(0, 50);
        localStorage.setItem('sos_history', JSON.stringify(trimmed));
    } catch (error) {
        console.error('Error saving SOS event:', error);
    }
};

/**
 * Get SOS history
 */
export const getSOSHistory = () => {
    try {
        const saved = localStorage.getItem('sos_history');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

/**
 * Clear SOS history
 */
export const clearSOSHistory = () => {
    localStorage.removeItem('sos_history');
};
