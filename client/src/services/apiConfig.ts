import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})
api.interceptors.request.use((req) => {
  const token = localStorage.getItem('x-auth-token');
  if (token) {
    axios.defaults.headers.Authorization = token;
    req.headers['x-auth-token'] = token;
  };
  return req;
});


export default api;
