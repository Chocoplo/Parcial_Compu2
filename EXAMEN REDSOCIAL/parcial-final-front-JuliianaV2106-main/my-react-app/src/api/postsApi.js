import apiClient from "./apiClient";

export const login = (username, password) =>
    apiClient.post("/api/v1/auth/login", { username, password });

export const getMe = () =>
    apiClient.get("/api/v1/users/me");

export const getPosts = () =>
    apiClient.get("/api/v1/posts");

export const createPost = (content) =>
    apiClient.post("/api/v1/posts", { content });

export const getPostById = (id) =>
    apiClient.get(`/api/v1/posts/${id}`);

export const getCommentsByPost = (postId) =>
    apiClient.get(`/api/v1/posts/${postId}/comments`);

export const addComment = (postId, content) =>
    apiClient.post(`/api/v1/posts/${postId}/comments`, { content });
