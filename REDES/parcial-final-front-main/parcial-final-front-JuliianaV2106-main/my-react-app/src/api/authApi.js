import axiosInstance from './axiosInstance';

// LOGIN → POST /login
// body: { username, password }
// respuesta: { token, username, name, lastName, userId, roles }
export const login = (username, password) =>
  axiosInstance.post('/login', { username, password });
