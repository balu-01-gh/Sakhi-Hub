import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const api = axios.create({
    baseURL: API_URL,
});

export const getCreators = async () => {
    const response = await api.get('/creators');
    return response.data;
};

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const createProfile = async (data) => {
    const response = await api.post('/create-profile', data);
    return response.data;
};

export const sendPeriodChat = async (data) => {
    const response = await api.post('/period-chat', data);
    return response.data;
};

export const sendPregnancyChat = async (data) => {
    const response = await api.post('/pregnancy-chat', data);
    return response.data;
};

export const sendKrishiChat = async (data) => {
    const response = await api.post('/api/health-bots/krishi-bot', data);
    return response.data;
};
