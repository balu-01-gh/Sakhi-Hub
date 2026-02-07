import axios from 'axios';

export const API_URL = 'http://127.0.0.1:8000';

export const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getCreators = async () => {
    const response = await api.get('/api/skill-hub/creators');
    return response.data;
};

export const getProducts = async () => {
    const response = await api.get('/api/skill-hub/products');
    return response.data;
};

export const createProduct = async (data) => {
    const response = await api.post('/api/skill-hub/add-product', data);
    return response.data;
};

export const createProfile = async (data) => {
    const response = await api.post('/api/skill-hub/create-profile', data);
    return response.data;
};

export const uploadWorkSample = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/skill-hub/uploads/work-sample', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const sendPeriodChat = async (data) => {
    const response = await api.post('/api/health-bots/period-chat', data);
    return response.data;
};

export const sendPregnancyChat = async (data) => {
    const response = await api.post('/api/health-bots/pregnancy-chat', data);
    return response.data;
};

export const sendKrishiChat = async (data) => {
    const response = await api.post('/api/krishi-bot/chat', data);
    return response.data;
};

// Authentication APIs
export const signup = async (data) => {
    const response = await api.post('/api/auth/signup', data);
    return response.data;
};

export const login = async (data) => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
};

export const updateUser = async (data) => {
    const response = await api.put('/api/auth/me', data);
    return response.data;
};

// Community APIs
export const getCommunityPosts = async () => {
    const response = await api.get('/api/community/posts');
    return response.data;
};

export const createCommunityPost = async (data) => {
    const response = await api.post('/api/community/posts', data);
    return response.data;
};

export const addComment = async (postId, data) => {
    const response = await api.post(`/api/community/posts/${postId}/comments`, data);
    return response.data;
};

export const likeCommunityPost = async (postId) => {
    const response = await api.post(`/api/community/posts/${postId}/like`);
    return response.data;
};

