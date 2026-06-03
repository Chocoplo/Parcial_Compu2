/**
 * Plantilla de API para cualquier entidad.
 * Copiar este archivo y renombrar ENTIDAD por el nombre real (vuelos, domicilios, posts, etc.)
 *
 * VUELOS:      ruta = "/vuelos",     body = { numeroVuelo, estado, aerolineaId }
 * PEDIDOS:     ruta = "/domicilios", body = { nombreDomiciliario, estado, userId }
 * REDSOCIAL:   ruta = "/posts",      body = { content }
 */
import apiClient from "./apiClient";

const RUTA = "/ENTIDAD"; // Reemplazar por la ruta real

export const login = (username, password) =>
    apiClient.post("/auth/login", { username, password });

export const getAll = () =>
    apiClient.get(RUTA);

export const create = (data) =>
    apiClient.post(RUTA, data);

export const update = (id, data) =>
    apiClient.put(`${RUTA}/${id}`, data);

export const remove = (id) =>
    apiClient.delete(`${RUTA}/${id}`);

// Solo para REDSOCIAL
export const getById = (id) =>
    apiClient.get(`${RUTA}/${id}`);

export const getComments = (postId) =>
    apiClient.get(`${RUTA}/${postId}/comments`);

export const addComment = (postId, content) =>
    apiClient.post(`${RUTA}/${postId}/comments`, { content });

export const getMe = () =>
    apiClient.get("/users/me");
