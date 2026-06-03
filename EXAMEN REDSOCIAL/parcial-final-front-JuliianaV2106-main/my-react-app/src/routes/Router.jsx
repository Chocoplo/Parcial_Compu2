import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "../pages/LoginPage";
import FeedPage from "../pages/FeedPage";
import PostDetailPage from "../pages/PostDetailPage";
import ComponentsPage from "../pages/ComponentsPage";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/" replace />;
    return children;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/feed",
        element: (
            <ProtectedRoute>
                <FeedPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/posts/:id",
        element: (
            <ProtectedRoute>
                <PostDetailPage />
            </ProtectedRoute>
        ),
    },
    {
        path: "/components",
        element: <ComponentsPage />,
    },
]);

export default router;
