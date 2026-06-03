import { Navigate } from "react-router";

// Componente Guardián de Rutas Privadas:
// Si existe un token JWT en localStorage, permite ver la página hija (children).
// Si no hay token, redirige inmediatamente a la pantalla de login (/login).
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
