import axios from 'axios';

// Minta URL backend dari temanmu (contoh: http://localhost:5000/api)
const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// Otomatis menempelkan Token JWT dari LocalStorage jika user sudah login
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;