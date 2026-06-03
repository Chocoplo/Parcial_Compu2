import axios from 'axios';

// URL relativa → el proxy de Vite la redirige a http://localhost:8080 sin CORS
const axiosInstance = axios.create({
  baseURL: '/api/v1',
});

// Interceptor de REQUEST: adjunta el token JWT en cada petición
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de RESPONSE: extrae .data automáticamente
// Así las funciones del API devuelven directo los datos sin response.data
axiosInstance.interceptors.response.use((response) => response.data);

export default axiosInstance;
