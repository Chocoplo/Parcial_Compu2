// (20%) LOGIN: consume POST /auth/login → guarda el token → redirige al dashboard
// Credenciales: Avianca / admin123  o  VivaAir / admin123
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
      localStorage.setItem('token', data.accessToken); // guarda el JWT para las peticiones posteriores
      navigate('/'); // redirige al tablero de vuelos
    } catch {
      setError('Credenciales inválidas. Prueba: Avianca / admin123');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f4ff' }}>
      <Paper component="form" onSubmit={handleLogin} elevation={3} sx={{ width: 400, p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" textAlign="center" fontWeight="bold">Tablero de Vuelos</Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary">Ingresa como aerolínea para continuar</Typography>
        {error && <Alert severity="error">{error}</Alert>}

        {/* El username es el nombre de la aerolínea (ej: Avianca), NO un email */}
        <TextField label="Aerolínea" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
        <TextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained" size="large">Ingresar</Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
