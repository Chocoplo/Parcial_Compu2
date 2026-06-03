import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

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
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardPage />
            </ProtectedRoute>
        ),
    },
]);

export default router;
