# Guía de Flujo: Creación del Frontend con React + Vite (Arquitectura Simplificada y Optimizada)

Esta guía explica paso a paso la estructura común y el flujo de desarrollo para crear la interfaz frontend (React + Vite) conectada con los servicios backend de la asignatura. Todos los proyectos de este repositorio se han simplificado para reducir la complejidad utilizando:
*   **Vite Proxy**: Redirección automática de peticiones `/api` al servidor backend (`http://localhost:8080`) evitando problemas de CORS.
*   **Axios Interceptors**: Extracción directa de los datos en la respuesta (`response.data`) e inyección automática del token de autorización.
*   **Enrutamiento Nativo en `App.jsx`**: Definición de rutas protegidas y públicas de forma limpia y directa, sin ficheros de rutas redundantes.
*   **Tarjetas Autónomas**: Las tarjetas de elementos individuales realizan sus propias peticiones a la API (actualización/borrado) y notifican a la vista principal para refrescar el listado.

---

## 📂 Estructura Simplificada del Proyecto Frontend

El código fuente del frontend se organiza dentro del directorio `front/src` de la siguiente manera:

```text
front/src/
├── 📁 api/             # Cliente Axios y llamadas a endpoints del Backend.
│   ├── axiosInstance.js# Configuración de Axios (Request interceptor para JWT + Response interceptor para extraer .data).
│   ├── authApi.js      # Petición de login.
│   └── [recurso]Api.js # CRUD específico de la entidad (ej: vuelosApi.js, domiciliosApi.js).
├── 📁 components/      # Componentes auxiliares y modulares.
│   ├── ProtectedRoute.jsx # Componente guardián para proteger vistas.
│   └── [Recurso]Card.jsx # Tarjeta individual que muestra datos, edita su propio estado y elimina.
├── 📁 pages/           # Vistas completas del flujo de la aplicación.
│   ├── LoginPage.jsx   # Vista de inicio de sesión.
│   └── DashboardPage.jsx # Tablero principal que contiene el formulario de creación y lista las tarjetas.
├── 📁 assets/          # Recursos estáticos (imágenes, logos).
├── 📄 App.jsx          # Declaración de rutas de React Router (<BrowserRouter>, <Routes>).
├── 📄 index.css        # Estilos generales y Tailwind.
└── 📄 main.jsx         # Punto de entrada de React. Renderiza <App />.
```

---

## 🛠️ Paso a Paso: Flujo de Construcción Completo

### Paso 1: Instalación de Dependencias

1. **Crear el proyecto con Vite**:
   ```bash
   npm create vite@latest front -- --template react
   cd front
   npm install
   ```

2. **Instalar dependencias necesarias**:
   - **HTTP Client**: `axios` para peticiones HTTP.
   - **Enrutamiento**: `react-router` (v7) para manejar rutas del cliente y redirecciones.
   - **Diseño & UI**: `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled` (Material UI).

   ```bash
   npm install axios react-router @mui/material @mui/icons-material @emotion/react @emotion/styled
   ```

---

### Paso 2: Configurar el Servidor y Proxy en `front/vite.config.js`

Configura el proxy de desarrollo de Vite para reenviar las llamadas hechas a `/api` hacia el backend en `http://localhost:8080`. Esto **elimina la necesidad de configurar CORS en el backend** y permite que el navegador realice solicitudes a la misma dirección IP y puerto del frontend.

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

---

### Paso 3: Configurar la Instancia de Axios (`src/api/axiosInstance.js`)

Se crea un interceptor doble para:
1. **Request**: Adjuntar la cabecera `Authorization: Bearer <token>` si hay una sesión iniciada.
2. **Response**: Retornar directamente `response.data` de modo que en los componentes no tengas que escribir `.data` en las respuestas de Axios.

```javascript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1', // Ruta relativa (manejada por el proxy de Vite)
});

// Interceptor de REQUEST: adjunta el token JWT en cada petición
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de RESPONSE: extrae .data automáticamente
axiosInstance.interceptors.response.use((response) => response.data);

export default axiosInstance;
```

---

### Paso 4: Configurar los Archivos de la API

#### A. Autenticación (`src/api/authApi.js`)
```javascript
import axiosInstance from './axiosInstance';

export const login = (username, password) => 
  axiosInstance.post('/auth/login', { username, password });
```

#### B. CRUD del Recurso (`src/api/[recurso]Api.js`)
*(Ejemplo para una entidad "Vuelo")*
```javascript
import axiosInstance from './axiosInstance';

// GET listado completo
export const getRecursos = () => axiosInstance.get('/vuelos');

// POST crear nuevo registro
export const createRecurso = (body) => axiosInstance.post('/vuelos', body);

// PUT actualizar registro existente por ID
export const updateRecurso = (id, body) => axiosInstance.put(`/vuelos/${id}`, body);

// DELETE eliminar registro por ID
export const deleteRecurso = (id) => axiosInstance.delete(`/vuelos/${id}`);
```

---

### Paso 5: Guardia de Rutas (`src/components/ProtectedRoute.jsx`)

Crea un componente envolvente que evalúe si existe un token JWT en el almacenamiento del navegador. Si no existe, redirige de inmediato a la vista pública de login.

```javascript
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
```

Instálalo junto al Router dentro de `src/App.jsx`:

```javascript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

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

### Paso 6: Crear las Vistas y Componentes

#### A. Vista de Login (`src/pages/LoginPage.jsx`)
Solicita las credenciales, consume el endpoint de login, almacena el token JWT de forma local en el navegador y redirige a la raíz `/` (donde está el Dashboard protegido).

```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, TextField, Button, Typography, Alert, Paper } from '@mui/material';
import { login } from '../api/authApi';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      // Ojo: Asegúrate de leer la propiedad del JSON que contenga el token (accessToken o token)
      localStorage.setItem('token', data.accessToken || data.token);
      navigate('/');
    } catch {
      setError('Credenciales inválidas. Revisa los datos de prueba del examen.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f4ff' }}>
      <Paper component="form" onSubmit={handleLogin} elevation={3} sx={{ width: 400, p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" textAlign="center" fontWeight="bold">Sistema de Gestión</Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary">Ingresa tus credenciales</Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField label="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
        <TextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained" size="large">Ingresar</Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
```

#### B. Vista Principal (`src/pages/DashboardPage.jsx`)
Muestra el formulario superior para añadir nuevos recursos y renderiza el listado.
*   **Nota**: El formulario está embebido directamente en la página para simplificar la estructura del proyecto y evitar crear ficheros extra.
*   Pasa un callback `onRefresh` a las tarjetas para que se vuelva a llamar a la API y se refresque la vista al editar o borrar.

```javascript
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, Divider, Alert, Paper } from '@mui/material';
import { getRecursos, createRecurso } from '../api/vuelosApi'; // Reemplazar por tu API correspondiente
import RecursoCard from '../components/RecursoCard';

const ESTADOS = ['PROGRAMADO', 'EN_VUELO', 'ATERRIZADO'];

const DashboardPage = () => {
  const [recursos, setRecursos] = useState([]);
  const [nombreCampo1, setNombreCampo1] = useState('');
  const [nombreCampo2, setNombreCampo2] = useState('PROGRAMADO');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Permite guardar una referencia dinámica como el ID de la aerolínea o del usuario asociado
  const idAsociadoRef = useRef(null);

  const fetchDatos = async () => {
    try {
      const data = await getRecursos();
      setRecursos(data);
      // Si el backend te exige pasar un ID padre en el POST que no viene en el token JWT, 
      // puedes extraerlo del primer elemento que retorna el GET listado
      if (data.length > 0 && !idAsociadoRef.current) {
        idAsociadoRef.current = data[0].aerolineaId || data[0].userId;
      }
    } catch {
      setError('Error al cargar la información del servidor.');
    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Envía los datos recogidos del formulario
      await createRecurso({
        nombreCampo1,
        estado: nombreCampo2,
        aerolineaId: idAsociadoRef.current // O el ID padre que requiera el Backend
      });
      setNombreCampo1('');
      setNombreCampo2('PROGRAMADO');
      fetchDatos(); // Vuelve a consultar la base de datos
    } catch {
      setError('Error al registrar el elemento.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Tablero de Control</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>Cerrar Sesión</Button>
      </Box>

      {/* Formulario de Creación Embebido */}
      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Nuevo Registro</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleCreate} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField 
            label="Descripción / Nombre" 
            value={nombreCampo1} 
            onChange={(e) => setNombreCampo1(e.target.value)} 
            required 
            size="small" 
            sx={{ flex: 1, minWidth: 200 }} 
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Estado</InputLabel>
            <Select value={nombreCampo2} label="Estado" onChange={(e) => setNombreCampo2(e.target.value)}>
              {ESTADOS.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">Crear</Button>
        </Box>
      </Paper>

      <Divider sx={{ mb: 3 }} />

      {/* Listado de Tarjetas */}
      <Typography variant="h6" sx={{ mb: 2 }}>Registros activos ({recursos.length})</Typography>
      {recursos.length === 0 ? (
        <Typography color="text.secondary">No se encontraron elementos.</Typography>
      ) : (
        recursos.map((item) => (
          <RecursoCard key={item.id} item={item} onRefresh={fetchDatos} />
        ))
      )}
    </Box>
  );
};

export default DashboardPage;
```

#### C. Tarjeta Individual (`src/components/[Recurso]Card.jsx`)
Administra su propio estado visual, consume directamente la API (`updateRecurso`, `deleteRecurso`) y notifica al padre a través de `onRefresh()` una vez finalizadas las peticiones.

```javascript
import { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Select, MenuItem, Button, FormControl, InputLabel, Chip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateRecurso, deleteRecurso } from '../api/vuelosApi'; // Reemplazar por tu API correspondiente

const ESTADOS = ['PROGRAMADO', 'EN_VUELO', 'ATERRIZADO'];
const ESTADO_COLOR = { PROGRAMADO: 'info', EN_VUELO: 'warning', ATERRIZADO: 'success' };

const RecursoCard = ({ item, onRefresh }) => {
  const [estado, setEstado] = useState(item.estado);
  const [loading, setLoading] = useState(false);

  // Actualización rápida: se dispara al cambiar el valor del Select
  const handleEstadoChange = async (nuevoEstado) => {
    setEstado(nuevoEstado); // Actualización visual inmediata (optimista)
    setLoading(true);
    try {
      // Recuerda enviar el objeto completo al hacer PUT (el backend lo suele requerir completo)
      await updateRecurso(item.id, {
        nombreCampo1: item.nombreCampo1,
        estado: nuevoEstado,
        aerolineaId: item.aerolineaId || item.userId // ID padre asociado
      });
      onRefresh(); // Sincroniza y recarga el listado del dashboard
    } catch {
      setEstado(item.estado); // Revierte el estado visual si falla la petición
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`¿Seguro que deseas eliminar el registro con ID ${item.id}?`)) return;
    try {
      await deleteRecurso(item.id);
      onRefresh(); // Notifica para recargar el listado en el Dashboard
    } catch {
      alert("Error al eliminar el elemento.");
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">{item.nombreCampo1}</Typography>
          <Chip label={estado} color={ESTADO_COLOR[estado]} size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          ID: {item.id} | Info Adicional: {item.infoExtra}
        </Typography>

        {/* Formulario rápido para cambiar el estado */}
        <FormControl fullWidth sx={{ mt: 2 }} size="small">
          <InputLabel>Estado</InputLabel>
          <Select 
            value={estado} 
            label="Estado" 
            onChange={(e) => handleEstadoChange(e.target.value)} 
            disabled={loading}
          >
            {ESTADOS.map((e) => (
              <MenuItem key={e} value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>

      <CardActions>
        <Button color="error" startIcon={<DeleteIcon />} onClick={handleDelete} size="small">
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecursoCard;
```

---

## 📋 Lista de Chequeo al Copiar y Pegar entre Exámenes

Para copiar este flujo y adaptarlo rápidamente a cualquier otro examen del repositorio (ej. de Vuelos a Pedidos o Red Social), sigue estos pasos sistemáticos:

1.  **Vite Server Proxy (`vite.config.js`)**:
    *   Verifica a qué puerto de localhost le apunta la API del backend del parcial actual (ej. `http://localhost:8080`) y cámbialo en la clave `target`.
2.  **Prefijo de la API (`axiosInstance.js`)**:
    *   Revisa si el backend sirve en `/api/v1` o directamente en `/api`. Modifica la propiedad `baseURL` convenientemente.
    *   Revisa la respuesta del login en `LoginPage.jsx` para comprobar si el JSON devuelto almacena el token en `data.accessToken` o en `data.token`.
3.  **Mapeo de Endpoints (`[recurso]Api.js`)**:
    *   Modifica el nombre del recurso en las URLs de Axios (ej. de `/vuelos` a `/domicilios` o `/publicaciones`).
4.  **Formulario y Atributos en `DashboardPage.jsx`**:
    *   Adapta los nombres de los estados `useState` de los inputs de texto al modelo del parcial actual.
    *   Modifica el array `ESTADOS` del dropdown de creación rápida.
    *   Comprueba en los controladores de creación (`handleCreate`) si necesitas enviar propiedades como `aerolineaId` o `userId`. Puedes extraerlas dinámicamente usando una referencia (`useRef`) con el valor recibido en el primer elemento del listado cargado con `fetchDatos()`.
5.  **Campos en `RecursoCard.jsx`**:
    *   Asegúrate de importar los métodos correctos de actualización y eliminación desde tu archivo API actual.
    *   Actualiza el objeto `ESTADO_COLOR` mapeando los chips correctos de Material UI (`info`, `warning`, `success`, `error`, etc.).
    *   Verifica que la petición de actualización (`updateRecurso`) reciba todas las propiedades obligatorias que exige el controlador `PUT` del backend.
