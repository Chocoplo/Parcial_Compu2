// ============================================================
// LoginPage.jsx — Pantalla de inicio de sesión
// ============================================================
// Esta es la PRIMERA pantalla que ve el usuario.
// Flujo:
//   1. Usuario escribe usuario y contraseña
//   2. Al enviar el form, llamamos al backend: POST /auth/login
//   3. Backend responde con { token: "eyJ..." }
//   4. Guardamos el token en localStorage y el store
//   5. Redirigimos al dashboard
// ============================================================

// useState: hook de React para manejar estado local del componente.
// Un "estado" es una variable que cuando cambia, React re-renderiza el componente.
import { useState } from "react";

// useNavigate: hook para navegar entre páginas programáticamente.
// (ej: después del login, ir al dashboard sin que el usuario haga clic)
import { useNavigate } from "react-router";

// Componentes de Material UI (MUI) — librería de componentes visuales ya estilizados.
// Box       → div con soporte de sx (estilos inline)
// Button    → botón estilizado
// Container → centra el contenido con ancho máximo
// Paper     → tarjeta con sombra (fondo blanco elevado)
// TextField → input de texto estilizado
// Typography→ texto con variantes (h1, h6, body, etc.)
// Alert     → mensaje de error/éxito con ícono
import { Box, Button, Container, Paper, TextField, Typography, Alert } from "@mui/material";

// Función login del archivo de API (hace el POST al backend)
import { login } from "../api/genericApi";

// setToken guarda el token en localStorage y en el store
import { setToken } from "../store/authStore";

// ------------------------------------------------------------
// Componente LoginPage
// ------------------------------------------------------------
// En React, un componente es una función que devuelve JSX (HTML extendido).
// JSX parece HTML pero tiene diferencias:
//   - class → className
//   - Las expresiones JS van entre { }
//   - Los estilos van en sx={{ }} (con MUI)
function LoginPage() {
    // useNavigate devuelve una función para cambiar de página
    const navigate = useNavigate();

    // useState(valorInicial) devuelve [valor, funcionParaCambiarElValor]
    // Cuando llamamos setUsername("nuevo"), React re-renderiza el componente
    const [username, setUsername] = useState("");   // empieza vacío
    const [password, setPassword] = useState("");   // empieza vacío
    const [error, setError] = useState("");         // mensaje de error, empieza vacío

    // ------------------------------------------------------------
    // handleSubmit — Se ejecuta cuando el usuario envía el formulario
    // ------------------------------------------------------------
    // async = función asíncrona (puede usar await para esperar al backend)
    // e = el evento del formulario
    const handleSubmit = async (e) => {
        // preventDefault() evita que la página se recargue al enviar el form.
        // Sin esto, el form haría una recarga tradicional de página.
        e.preventDefault();

        // Limpiamos el error anterior antes de intentar de nuevo
        setError("");

        try {
            // await espera a que el backend responda.
            // login() hace: POST /auth/login con { username, password }
            // res = la respuesta completa del backend
            const res = await login(username, password);

            // res.data es el cuerpo de la respuesta: { token: "eyJ..." }
            // Guardamos el token en localStorage y en el store
            setToken(res.data.token);

            // Redirigimos al dashboard. navigate("/dashboard") cambia la URL.
            navigate("/dashboard");
            // Para REDSOCIAL cambiar a: navigate("/feed")

        } catch {
            // Si el backend responde con error (ej: 401 Unauthorized),
            // el catch captura la excepción y mostramos el mensaje de error.
            setError("Credenciales incorrectas. Intenta de nuevo.");
        }
    };

    // El return es el JSX (lo que se ve en pantalla)
    return (
        // Container centra el contenido. maxWidth="xs" = ancho máximo pequeño (~400px)
        <Container maxWidth="xs">
            {/* Box es un div. sx={{ mt: 10 }} = margin-top: 10 unidades MUI (~80px) */}
            <Box sx={{ mt: 10 }}>
                {/* Paper = tarjeta blanca con sombra. p=padding, borderRadius=bordes redondeados */}
                <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>

                    {/* Typography variant="h5" = título de tamaño h5 */}
                    <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
                        Iniciar sesión
                        {/* Cambiar el título según el examen:
                            "Tablero de Pedidos" / "Tablero de Vuelos" / "Red Social" */}
                    </Typography>

                    {/* Renderizado condicional: solo muestra Alert si hay error.
                        En JSX: {condición && <componente />} = mostrar solo si condición es true */}
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    {/* onSubmit = función que se llama al enviar el formulario */}
                    <form onSubmit={handleSubmit}>

                        {/* TextField = input de texto de MUI
                            value = el valor actual del input (controlado por estado)
                            onChange = función que se llama en cada tecla presionada
                            e.target.value = el texto que el usuario escribió */}
                        <TextField
                            label="Usuario"
                            fullWidth            // ancho 100%
                            margin="normal"      // margen arriba y abajo
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required             // HTML5: no deja enviar si está vacío
                        />

                        <TextField
                            label="Contraseña"
                            type="password"      // oculta el texto con *****
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {/* type="submit" → al hacer clic dispara el onSubmit del form */}
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Iniciar sesión
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
}

// Exportamos el componente para que Router.jsx lo pueda importar
export default LoginPage;
