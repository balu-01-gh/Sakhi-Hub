// Authentication utility functions

/**
 * Store authentication token and user data
 */
export const setAuthData = (token, user) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    localStorage.setItem('user_name', user.name);
    localStorage.setItem('is_logged_in', 'true');
    localStorage.setItem('is_creator', user.is_creator ? 'true' : 'false');
};

/**
 * Get stored authentication token
 */
export const getAuthToken = () => {
    return localStorage.getItem('auth_token');
};

/**
 * Get stored user data
 */
export const getUserData = () => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    const token = getAuthToken();
    const userData = getUserData();
    return !!(token && userData);
};

/**
 * Clear authentication data (logout)
 */
export const clearAuthData = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_name');
    localStorage.removeItem('is_logged_in');
    localStorage.removeItem('is_creator');
};

/**
 * Get user name from storage
 */
export const getUserName = () => {
    return localStorage.getItem('user_name') || 'Sakhi User';
};

/**
 * Check if user is a creator
 */
export const isCreator = () => {
    return localStorage.getItem('is_creator') === 'true';
};
