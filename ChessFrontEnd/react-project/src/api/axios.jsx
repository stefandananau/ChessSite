import axios from 'axios';
const BASE_URL = 'http://localhost:5042/api';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    API_URL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});