// ============================================================
// apiClient.js — La "conexión base" con el backend
// ============================================================
// Este archivo crea UNA SOLA instancia de axios configurada.
// Todos los demás archivos de API importan ESTE cliente,
// así no repetimos la URL base ni el token en cada llamada.
// ============================================================

import axios from "axios";

const apiClient = axios.create({
    // baseURL: la dirección raíz del backend.
    // Usamos una ruta relativa "/api/v1" porque el proxy de Vite
    // (configurado en vite.config.js) redirige las peticiones
    // automáticamente a http://localhost:8080 evitando errores de CORS.
    //
    // CAMBIAR SEGÚN EL EXAMEN:
    //   Si tu backend tiene otro prefijo o puerto, se configura en vite.config.js
    baseURL: "/api/v1",
});

// interceptors.request.use() = "antes de CADA petición, haz esto".
// Es como un guardia que revisa cada request antes de enviarlo.
apiClient.interceptors.request.use((config) => {
    // Leemos el token JWT del almacenamiento del navegador (localStorage).
    const token = localStorage.getItem("token");

    // Si existe el token, lo agregamos al header "Authorization"
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// interceptors.response.use() = "después de recibir CADA respuesta, haz esto".
// Extrae automáticamente el .data de la respuesta.
// Así, las llamadas a la API retornan directamente el JSON de respuesta
// sin necesidad de escribir `.data` en los componentes.
apiClient.interceptors.response.use((response) => response.data);

export default apiClient;
