// ============================================================
// LoginPage.jsx — Pantalla de inicio de sesión
// ============================================================
// Esta es la PRIMERA pantalla que ve el usuario.
// Flujo:
//   1. Usuario escribe usuario y contraseña.
//   2. Al enviar el form, llamamos al backend: POST /auth/login.
//   3. El interceptor de Axios extrae automáticamente la respuesta (.data).
//   4. Guardamos el token en localStorage.
//   5. Redirigimos a la ruta raíz "/" (DashboardPage).
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Container, Paper, TextField, Typography, Alert } from "@mui/material";
import { login } from "../api/genericApi";

function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // login() hace: POST /auth/login con { username, password }
            // Como el interceptor extrae .data, "res" es directamente el cuerpo de respuesta
            const res = await login(username, password);

            // Guardamos el token en localStorage
            // El backend del examen puede devolver "res.token" o "res.accessToken"
            const token = res.token || res.accessToken || res;
            if (token) {
                localStorage.setItem("token", token);
                navigate("/"); // Redirige al dashboard
            } else {
                setError("El servidor no devolvió un token de sesión.");
            }
        } catch {
            setError("Credenciales incorrectas. Intenta de nuevo.");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4, width: '100%' }}>
                    <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
                        Iniciar Sesión
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Usuario"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                        />

                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} size="large">
                            Ingresar
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
}

export default LoginPage;
