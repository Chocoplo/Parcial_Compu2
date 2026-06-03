// ============================================================
// Router.jsx — Navegación de la aplicación
// ============================================================
// Define qué PÁGINA (componente) se muestra en cada URL.
// También protege las rutas que requieren login.
//
// RUTAS DE ESTE TEMPLATE:
//   /           → LoginPage   (pública, cualquiera puede entrar)
//   /dashboard  → DashboardPage (protegida, solo con token)
//
// PARA REDSOCIAL AGREGAR:
//   /feed       → FeedPage
//   /posts/:id  → PostDetailPage  (:id es un parámetro variable)
// ============================================================

// createBrowserRouter: función que crea el router con URLs normales (sin #)
// Navigate: componente que redirige a otra ruta inmediatamente
import { createBrowserRouter, Navigate } from "react-router";

// Importamos las páginas. Cada página es un componente React.
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

// Si el examen tiene más páginas, descomenta estas líneas:
// import FeedPage from "../pages/FeedPage";
// import PostDetailPage from "../pages/PostDetailPage";

// ------------------------------------------------------------
// ProtectedRoute — "Guardia" de rutas privadas
// ------------------------------------------------------------
// Esto es un componente React que envuelve otras páginas.
// Si hay token → muestra la página normalmente (children).
// Si NO hay token → redirige a "/" (login) automáticamente.
//
// { children } en los parámetros = lo que va DENTRO del componente.
// Ejemplo de uso en el router:
//   <ProtectedRoute><DashboardPage /></ProtectedRoute>
//   Si no hay token → va a "/" en vez de mostrar DashboardPage.
function ProtectedRoute({ children }) {
    // Leemos el token del localStorage
    const token = localStorage.getItem("token");

    // Si NO hay token, redirigir a la página de login
    // "replace" evita que el usuario pueda volver con el botón "atrás"
    if (!token) return <Navigate to="/" replace />;

    // Si SÍ hay token, renderizar normalmente la página hija
    return children;
}

// ------------------------------------------------------------
// createBrowserRouter — Define todas las rutas
// ------------------------------------------------------------
// Recibe un ARRAY de objetos. Cada objeto es una ruta.
// Cada objeto tiene:
//   path:    la URL (ej: "/dashboard")
//   element: el componente JSX que se muestra
const router = createBrowserRouter([
    {
        // Ruta raíz = login
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/dashboard",
        // Envolvemos DashboardPage con ProtectedRoute para protegerla
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },

    // ---- PARA REDSOCIAL: descomenta estas rutas ----
    // {
    //     path: "/feed",
    //     element: <ProtectedRoute><FeedPage /></ProtectedRoute>,
    // },
    // {
    //     // :id es un parámetro dinámico. Si la URL es /posts/7, entonces id=7
    //     // En el componente se lee con: const { id } = useParams();
    //     path: "/posts/:id",
    //     element: <ProtectedRoute><PostDetailPage /></ProtectedRoute>,
    // },
]);

// Exportamos el router para usarlo en main.jsx
export default router;
