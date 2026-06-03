// ============================================================
// authStore.js — Estado global de autenticación
// ============================================================
// Un "store" es un lugar donde guardamos estado que VARIOS componentes
// necesitan leer. Sin store, habría que pasar props por 5 niveles.
//
// Usamos @tanstack/react-store (ya viene en el package.json del curso).
// Es similar a Redux pero más simple.
//
// Este store guarda:
//   - token:           el JWT que da el backend al hacer login
//   - isAuthenticated: true si hay token, false si no
// ============================================================

// Importamos la clase Store de la librería tanstack
import { Store } from "@tanstack/react-store";

// Creamos el store con su estado inicial.
// Al crear el store leemos localStorage para mantener la sesión
// si el usuario recarga la página.
export const authStore = new Store({
    // localStorage.getItem("token") devuelve el token si existe, o null si no.
    // El operador || significa "o": si getItem devuelve null, usa null.
    token: localStorage.getItem("token") || null,

    // !! convierte cualquier valor a booleano.
    // Si hay token → !!token = true (autenticado)
    // Si no hay    → !!null  = false (no autenticado)
    isAuthenticated: !!localStorage.getItem("token"),
});

// ------------------------------------------------------------
// setToken — Guardar el token después del login
// ------------------------------------------------------------
// Llamar esta función justo después de que el backend responde
// con el token. Guarda el token en DOS lugares:
//   1. localStorage → persiste aunque el usuario recargue la página
//   2. authStore    → actualiza el estado en tiempo real
export const setToken = (token) => {
    // Guardar en el navegador (persiste entre recargas)
    localStorage.setItem("token", token);

    // Actualizar el store. setState recibe una función que devuelve el nuevo estado.
    // () => ({ ... }) es una función flecha que devuelve un objeto.
    authStore.setState(() => ({ token, isAuthenticated: true }));
};

// ------------------------------------------------------------
// clearToken — Borrar el token (logout)
// ------------------------------------------------------------
// Llamar esta función cuando el usuario hace clic en "Cerrar sesión".
export const clearToken = () => {
    // Borramos del localStorage
    localStorage.removeItem("token");

    // Reseteamos el store a "no autenticado"
    authStore.setState(() => ({ token: null, isAuthenticated: false }));
};
