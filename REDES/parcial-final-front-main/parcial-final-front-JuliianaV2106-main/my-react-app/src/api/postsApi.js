import axiosInstance from './axiosInstance';

// GET todos los posts → /posts
export const getPosts = () => axiosInstance.get('/posts');

// GET post por ID → /posts/:id
export const getPostById = (id) => axiosInstance.get(`/posts/${id}`);

// POST crear post → body: { content, userId }
export const createPost = (body) => axiosInstance.post('/posts', body);

// GET comentarios de un post → /posts/:id/comments
export const getCommentsByPostId = (id) => axiosInstance.get(`/posts/${id}/comments`);

// POST agregar comentario → body: { content, userId }
export const addComment = (postId, body) => axiosInstance.post(`/posts/${postId}/comments`, body);
