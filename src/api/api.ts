// src/api.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000', // 替换为你的API基础URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchCardData = () => {
    return apiClient.get('/card-data'); // 替换为你的API端点
};

export const fetchTableData = () => {
    return apiClient.get('/table-data'); // 替换为你的API端点
};
