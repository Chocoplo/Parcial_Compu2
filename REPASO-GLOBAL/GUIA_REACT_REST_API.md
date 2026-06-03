# Guía de Estudio: React + REST API con JWT

## Patrón completo — de memoria

### 1. Estructura de carpetas (siempre igual)
```
src/
  api/
    apiClient.js        ← axios con interceptor JWT
    entidadApi.js       ← funciones de cada endpoint
  store/
    authStore.js        ← estado del token (tanstack/react-store)
  pages/
    LoginPage.jsx
    DashboardPage.jsx   (o FeedPage.jsx)
  components/
    EntidadCard.jsx     ← muestra + acciones de un item
    EntidadForm.jsx     ← formulario de creación
  routes/
    Router.jsx          ← rutas + ProtectedRoute
  main.jsx
```

---

### 2. apiClient.js — interceptor JWT (SIEMPRE IGUAL)
```js
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/v1",
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default apiClient;
```

---

### 3. authStore.js — estado del token
```js
import { Store } from "@tanstack/react-store";

export const authStore = new Store({
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
});

export const setToken = (token) => {
    localStorage.setItem("token", token);
    authStore.setState(() => ({ token, isAuthenticated: true }));
};

export const clearToken = () => {
    localStorage.removeItem("token");
    authStore.setState(() => ({ token: null, isAuthenticated: false }));
};
```

---

### 4. Router.jsx — ruta protegida
```jsx
import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

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
]);

export default router;
```

---

### 5. LoginPage.jsx — flujo completo
```jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api/entidadApi";
import { setToken } from "../store/authStore";

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(username, password);
            setToken(res.data.token);   // guardar token
            navigate("/dashboard");     // redirigir
        } catch {
            setError("Credenciales incorrectas.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p>{error}</p>}
            <button type="submit">Ingresar</button>
        </form>
    );
}
```

---

### 6. DashboardPage.jsx — CRUD completo
```jsx
import { useEffect, useState } from "react";
import { getItems, createItem, updateItem, deleteItem } from "../api/entidadApi";

function DashboardPage() {
    const [items, setItems] = useState([]);

    // Cargar al montar
    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        const res = await getItems();
        setItems(res.data);
    };

    const handleCreate = async (data) => {
        await createItem(data);
        await fetchItems();          // refrescar lista
    };

    const handleUpdate = async (id, data) => {
        await updateItem(id, data);
        await fetchItems();
    };

    const handleDelete = async (id) => {
        await deleteItem(id);
        setItems((prev) => prev.filter((item) => item.id !== id)); // optimista
    };
    
    // ...JSX
}
```

---

### 7. main.jsx — setup
```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./routes/Router";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
```

---

## Endpoints típicos del examen

| Acción | Método | URL | Body |
|--------|--------|-----|------|
| Login | POST | `/api/v1/auth/login` | `{ username, password }` |
| Listar | GET | `/api/v1/entidades` | — |
| Crear | POST | `/api/v1/entidades` | `{ campo1, campo2, ... }` |
| Actualizar | PUT | `/api/v1/entidades/{id}` | `{ campo1, campo2, ... }` |
| Eliminar | DELETE | `/api/v1/entidades/{id}` | — |

## Entidades por examen

| Examen | Entidad | Endpoint | Campos |
|--------|---------|----------|--------|
| PEDIDOS | Domicilio | `/api/v1/domicilios` | `nombreDomiciliario`, `estado`, `userId` |
| VUELOS | Vuelo | `/api/v1/vuelos` | `numeroVuelo`, `estado`, `aerolineaId` |
| REDSOCIAL | Post | `/api/v1/posts` | `content` |
| REDSOCIAL | Comment | `/api/v1/posts/{id}/comments` | `content` |

## Estados por examen

| Examen | Estados |
|--------|---------|
| PEDIDOS | `EN_CAMINO`, `EN_REPARTO`, `ENTREGADO` |
| VUELOS | `PROGRAMADO`, `EN_VUELO`, `ATERRIZADO` |

---

## Checklist del examen (en orden)

1. [ ] Leer el PDF del examen completo
2. [ ] Crear las carpetas: `api/`, `store/`, `pages/`, `components/`, `routes/`
3. [ ] Crear `apiClient.js` con el baseURL correcto y el interceptor
4. [ ] Crear `authStore.js`
5. [ ] Crear `Router.jsx` con `ProtectedRoute`
6. [ ] Crear `LoginPage.jsx` — `POST /auth/login` → guardar token → navegar
7. [ ] Actualizar `main.jsx` para usar `RouterProvider`
8. [ ] Crear `DashboardPage.jsx` — `useEffect` para cargar items
9. [ ] Crear componente del item (Card) — mostrar info + Select estado + botón eliminar
10. [ ] Crear formulario de creación (Form)
11. [ ] Conectar todo: onUpdate, onDelete, onCreated
