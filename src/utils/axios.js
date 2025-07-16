// src/utils/axios.js
import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // use https://safespace-backend-ve3n.onrender.com in .env for Vercel

});

export default API;