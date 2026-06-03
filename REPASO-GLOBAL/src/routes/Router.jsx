import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

// Para REDSOCIAL, agregar:
// import FeedPage from "../pages/FeedPage";
// import PostDetailPage from "../pages/PostDetailPage";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/" replace />;
    return children;
}

const router = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    {
        path: "/dashboard",
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
    },
    // Para REDSOCIAL:
    // { path: "/feed", element: <ProtectedRoute><FeedPage /></ProtectedRoute> },
    // { path: "/posts/:id", element: <ProtectedRoute><PostDetailPage /></ProtectedRoute> },
]);

export default router;
