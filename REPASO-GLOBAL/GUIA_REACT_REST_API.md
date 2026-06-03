# Guía de Estudio: React + REST API con JWT (Estructura Simplificada)

## Patrón completo — de memoria

### 1. Estructura de carpetas (siempre igual)
```
src/
  api/
    axiosInstance.js    ← axios con interceptores (JWT + extractor de .data)
    genericApi.js       ← funciones de cada endpoint (CRUD)
  components/
    ProtectedRoute.jsx  ← guardia de ruta que verifica localStorage
    ItemCard.jsx        ← tarjeta autónoma (hace PUT/DELETE y llama onRefresh)
    ItemForm.jsx        ← formulario de creación (o integrado en DashboardPage)
  pages/
    LoginPage.jsx       ← formulario de login (guarda token en localStorage)
    DashboardPage.jsx   ← vista principal con el listado
  App.jsx               ← enrutamiento con react-router (<BrowserRouter>)
  main.jsx              ← punto de entrada (renderiza <App />)
```

---

### 2. axiosInstance.js — Interceptor JWT y Response extractor (SIEMPRE IGUAL)
```js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api/v1", // URL relativa para usar con el Proxy de Vite
});

// Request interceptor: adjunta el token JWT
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Response interceptor: extrae .data automáticamente
axiosInstance.interceptors.response.use((response) => response.data);

export default axiosInstance;
```

---

### 3. ProtectedRoute.jsx — Guardia de ruta (SIEMPRE IGUAL)
```jsx
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" replace />;
    return children;
}

export default ProtectedRoute;
```

---

### 4. App.jsx — Enrutamiento Central
```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
```

---

### 5. LoginPage.jsx — Flujo completo
```jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api/genericApi";

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // El response interceptor ya extrae la data, obtenemos el token directo
            const res = await login(username, password);
            localStorage.setItem("token", res.token || res.accessToken || res); 
            navigate("/"); // Redirige al Dashboard
        } catch {
            setError("Credenciales incorrectas.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p>{error}</p>}
            <button type="submit">Ingresar</button>
        </form>
    );
}

export default LoginPage;
```

---

### 6. DashboardPage.jsx — Carga y renderizado
```jsx
import { useEffect, useState } from "react";
import { getAll, create } from "../api/genericApi";
import ItemCard from "../components/ItemCard";

function DashboardPage() {
    const [items, setItems] = useState([]);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        // Obtenemos los datos directamente sin escribir res.data
        const data = await getAll();
        setItems(data);
    };

    const handleCreate = async (formData) => {
        await create(formData);
        await fetchItems(); // refrescar
    };

    return (
        <div>
            {/* Formulario e Items */}
            {items.map((item) => (
                <ItemCard key={item.id} item={item} onRefresh={fetchItems} />
            ))}
        </div>
    );
}

export default DashboardPage;
```

---

### 7. ItemCard.jsx — Acciones autónomas
```jsx
import { useState } from "react";
import { update, remove } from "../api/genericApi";

function ItemCard({ item, onRefresh }) {
    const [estado, setEstado] = useState(item.estado);

    const handleEstadoChange = async (nuevoEstado) => {
        setEstado(nuevoEstado);
        try {
            await update(item.id, { nombreCampo: item.nombreCampo, estado: nuevoEstado });
            onRefresh(); // Notifica al Dashboard para recargar
        } catch {
            setEstado(item.estado); // Revierte
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Eliminar?")) return;
        await remove(item.id);
        onRefresh();
    };

    // ... renderizado visual
}
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

## Estados por examen

| Examen | Estados |
|--------|---------|
| PEDIDOS | `EN_CAMINO`, `EN_REPARTO`, `ENTREGADO` |
| VUELOS | `PROGRAMADO`, `EN_VUELO`, `ATERRIZADO` |

---

## Checklist del examen (en orden)

1. [ ] Leer el PDF del examen completo.
2. [ ] Configurar el proxy de desarrollo en `vite.config.js` apuntando al puerto del backend.
3. [ ] Crear `api/axiosInstance.js` con el baseURL relativo y los interceptores.
4. [ ] Crear la API de la entidad y la de autenticación en `api/`.
5. [ ] Crear `components/ProtectedRoute.jsx` para proteger rutas.
6. [ ] Crear `App.jsx` configurando las rutas con `react-router`.
7. [ ] Actualizar `main.jsx` para renderizar `<App />`.
8. [ ] Crear `LoginPage.jsx` — guarda token en localStorage y navega a `/`.
9. [ ] Crear `DashboardPage.jsx` — consulta el listado al montar con `useEffect`.
10. [ ] Crear `components/ItemCard.jsx` — gestiona sus llamadas API de actualización/eliminación y ejecuta `onRefresh`.
11. [ ] Conectar creación en Dashboard y listado de tarjetas.
