import { boot } from 'quasar';
import axios from 'axios';
import { LocalStorage } from 'quasar';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = LocalStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axiosInstance;
  app.config.globalProperties.$api = axiosInstance;
});

export { axiosInstance };
