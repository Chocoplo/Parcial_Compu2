import { createBrowserRouter } from "react-router";
import ComponentsPage from "../pages/ComponentsPage";
import LoginPage from "../pages/LoginPage";
import FeedPage from "../pages/FeedPage";
import PostDetailPage from "../pages/PostDetailPage";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
    // Página de componentes (referencia visual, pública)
    { path: "/components", Component: ComponentsPage },

    // Login público
    { path: "/login", element: <LoginPage /> },

    // Feed protegido — requiere token
    { path: "/", element: <ProtectedRoute><FeedPage /></ProtectedRoute> },

    // Detalle de post con comentarios — protegido
    { path: "/posts/:id", element: <ProtectedRoute><PostDetailPage /></ProtectedRoute> },

], { basename: "/compu2/front" });

export default router;
