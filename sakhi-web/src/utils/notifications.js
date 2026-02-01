/**
 * Notification Manager
 * Handles push notifications, period reminders, and health tips
 */

const NOTIFICATION_PERMISSION_KEY = 'notification_permission';
const REMINDERS_KEY = 'health_reminders';

/**
 * Request notification permission
 */
export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return false;
    }

    try {
        const permission = await Notification.requestPermission();
        localStorage.setItem(NOTIFICATION_PERMISSION_KEY, permission);
        return permission === 'granted';
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
    }
};

/**
 * Check if notifications are enabled
 */
export const areNotificationsEnabled = () => {
    if (!('Notification' in window)) return false;
    return Notification.permission === 'granted';
};

/**
 * Show a notification
 */
export const showNotification = (title, options = {}) => {
    if (!areNotificationsEnabled()) return;

    const defaultOptions = {
        icon: '/images/logo.png',
        badge: '/images/logo.png',
        vibrate: [200, 100, 200],
        ...options
    };

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(title, defaultOptions);
        });
    } else {
        new Notification(title, defaultOptions);
    }
};

/**
 * Schedule period reminder
 */
export const schedulePeriodReminder = (nextPeriodDate, userName = 'there') => {
    const reminderDate = new Date(nextPeriodDate);
    reminderDate.setDate(reminderDate.getDate() - 2); // Remind 2 days before

    const now = new Date();
    const timeUntilReminder = reminderDate - now;

    if (timeUntilReminder > 0) {
        setTimeout(() => {
            showNotification('Period Reminder', {
                body: `Hi ${userName}! Your period is expected in 2 days. Stay prepared! 💝`,
                tag: 'period-reminder',
                requireInteraction: true
            });
        }, timeUntilReminder);

        // Save reminder to localStorage
        const reminders = getReminders();
        reminders.push({
            type: 'period',
            date: reminderDate.toISOString(),
            message: 'Period expected in 2 days'
        });
        saveReminders(reminders);
    }
};

/**
 * Schedule daily health tip
 */
export const scheduleDailyHealthTip = () => {
    const tips = [
        'Drink at least 8 glasses of water today! 💧',
        'Remember to take a 10-minute walk for better health 🚶‍♀️',
        'Eat plenty of fruits and vegetables today 🥗',
        'Get at least 7-8 hours of sleep tonight 😴',
        'Practice deep breathing for stress relief 🧘‍♀️',
        'Wash your hands regularly to stay healthy 🧼',
        'Take a break from screens every hour 📱',
        'Stretch your body to reduce muscle tension 🤸‍♀️'
    ];

    // Show tip at 9 AM every day
    const now = new Date();
    const tomorrow9AM = new Date(now);
    tomorrow9AM.setDate(tomorrow9AM.getDate() + 1);
    tomorrow9AM.setHours(9, 0, 0, 0);

    const timeUntilTip = tomorrow9AM - now;

    setTimeout(() => {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        showNotification('Daily Health Tip', {
            body: randomTip,
            tag: 'daily-tip'
        });
        // Reschedule for next day
        scheduleDailyHealthTip();
    }, timeUntilTip);
};

/**
 * Get saved reminders
 */
const getReminders = () => {
    try {
        const saved = localStorage.getItem(REMINDERS_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

/**
 * Save reminders
 */
const saveReminders = (reminders) => {
    try {
        localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
    } catch (error) {
        console.error('Error saving reminders:', error);
    }
};

/**
 * Clear all reminders
 */
export const clearAllReminders = () => {
    localStorage.removeItem(REMINDERS_KEY);
};
