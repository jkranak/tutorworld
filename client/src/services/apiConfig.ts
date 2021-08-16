import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

api.interceptors.request.use((req) => { // attach token to all headers in all requests
  const token = localStorage.getItem('x-auth-token');
  if (token) {
    axios.defaults.headers.Authorization = token;
    req.headers['Authorization'] = token;
  };
  return req;
});


export default api;
