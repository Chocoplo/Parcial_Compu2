import apiClient from "./apiClient";

export const login = (username, password) =>
    apiClient.post("/auth/login", { username, password });

export const getPedidos = () =>
    apiClient.get("/domicilios");

export const createPedido = (data) =>
    apiClient.post("/domicilios", data);

export const updatePedido = (id, data) =>
    apiClient.put(`/domicilios/${id}`, data);

export const deletePedido = (id) =>
    apiClient.delete(`/domicilios/${id}`);
