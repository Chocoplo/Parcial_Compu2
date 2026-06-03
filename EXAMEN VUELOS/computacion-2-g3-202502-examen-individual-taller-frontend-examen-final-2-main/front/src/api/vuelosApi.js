import apiClient from "./apiClient";

export const login = (username, password) =>
    apiClient.post("/auth/login", { username, password });

export const getVuelos = () =>
    apiClient.get("/vuelos");

export const createVuelo = (data) =>
    apiClient.post("/vuelos", data);

export const updateVuelo = (id, data) =>
    apiClient.put(`/vuelos/${id}`, data);

export const deleteVuelo = (id) =>
    apiClient.delete(`/vuelos/${id}`);
