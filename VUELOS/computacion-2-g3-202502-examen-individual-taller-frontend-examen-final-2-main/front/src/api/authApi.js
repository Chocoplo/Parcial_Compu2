import axiosInstance from './axiosInstance';

// (20%) LOGIN → POST /auth/login
// body: { username: "Avianca", password: "admin123" }
// respuesta: { accessToken: "eyJ..." }
export const login = (username, password) =>
  axiosInstance.post('/auth/login', { username, password });
