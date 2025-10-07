import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Don't set the Authorization header at all
    delete config.headers.Authorization;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
