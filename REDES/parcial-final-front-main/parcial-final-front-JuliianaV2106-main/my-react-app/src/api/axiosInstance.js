import axios from 'axios';

// URL base del API tomada del .env.development → VITE_API_URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor de REQUEST: adjunta el token JWT en cada petición protegida
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de RESPONSE: extrae .data automáticamente
axiosInstance.interceptors.response.use((response) => response.data);

export default axiosInstance;
