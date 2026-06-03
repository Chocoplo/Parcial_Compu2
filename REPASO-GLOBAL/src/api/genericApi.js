// ============================================================
// genericApi.js — Todas las llamadas al backend
// ============================================================
// Cada función de este archivo corresponde a UN endpoint del backend.
// Las funciones usan apiClient (que ya tiene el token y la baseURL).
//
// CÓMO ADAPTAR AL EXAMEN:
//   1. Cambiar RUTA por la ruta real que diga el PDF o el backend
//   2. El resto del código se queda igual
//
// RUTAS POR EXAMEN:
//   VUELOS:    "/vuelos"
//   PEDIDOS:   "/domicilios"
//   REDSOCIAL: "/posts"  (y también "/posts/{id}/comments")
// ============================================================

// Importamos el cliente axios configurado (con baseURL e interceptor del token)
import apiClient from "./apiClient";

// La ruta de la entidad principal. Cambiar según el examen.
const RUTA = "/ENTIDAD";

// ------------------------------------------------------------
// LOGIN — Autenticación del usuario
// ------------------------------------------------------------
// Función async = función asíncrona = puede hacer esperas (await).
// Recibe username y password como parámetros.
// Hace POST a /auth/login enviando las credenciales en el body.
// El backend responde con { token: "eyJ..." }
export const login = (username, password) =>
    // apiClient.post(url, body) → hace una petición POST
    // El body es el JSON que va en el cuerpo del request: { username, password }
    apiClient.post("/auth/login", { username, password });

// ------------------------------------------------------------
// GET ALL — Obtener todos los elementos
// ------------------------------------------------------------
// Hace GET a /RUTA (ej: GET /vuelos)
// El backend responde con un array: [{ id:1, ... }, { id:2, ... }]
export const getAll = () =>
    apiClient.get(RUTA);

// ------------------------------------------------------------
// CREATE — Crear un elemento nuevo
// ------------------------------------------------------------
// Hace POST a /RUTA enviando los datos del nuevo elemento en el body.
// "data" es un objeto con los campos que pide el backend.
// Ej VUELOS: data = { numeroVuelo: "AV123", estado: "PROGRAMADO", aerolineaId: 1 }
export const create = (data) =>
    apiClient.post(RUTA, data);

// ------------------------------------------------------------
// UPDATE — Actualizar un elemento existente
// ------------------------------------------------------------
// Hace PUT a /RUTA/{id} (ej: PUT /vuelos/5)
// Las comillas backtick con ${id} insertan el id en la URL.
// "data" tiene los campos actualizados.
export const update = (id, data) =>
    // `${RUTA}/${id}` → si RUTA="/vuelos" e id=5, resulta "/vuelos/5"
    apiClient.put(`${RUTA}/${id}`, data);

// ------------------------------------------------------------
// DELETE — Eliminar un elemento
// ------------------------------------------------------------
// Hace DELETE a /RUTA/{id}
// "remove" en vez de "delete" porque "delete" es palabra reservada en JS.
export const remove = (id) =>
    apiClient.delete(`${RUTA}/${id}`);

// ------------------------------------------------------------
// LAS SIGUIENTES SOLO SE USAN EN REDSOCIAL
// ------------------------------------------------------------

// Obtiene UN post por su id (para la página de detalle)
// Hace GET a /posts/{id}
export const getById = (id) =>
    apiClient.get(`${RUTA}/${id}`);

// Obtiene los comentarios de un post específico
// Hace GET a /posts/{postId}/comments
export const getComments = (postId) =>
    apiClient.get(`${RUTA}/${postId}/comments`);

// Agrega un comentario a un post
// Hace POST a /posts/{postId}/comments con { content: "texto del comentario" }
export const addComment = (postId, content) =>
    apiClient.post(`${RUTA}/${postId}/comments`, { content });

// Obtiene la info del usuario autenticado (quien tiene el token)
// Hace GET a /users/me
// El backend sabe quién es por el token en el header Authorization
export const getMe = () =>
    apiClient.get("/users/me");
