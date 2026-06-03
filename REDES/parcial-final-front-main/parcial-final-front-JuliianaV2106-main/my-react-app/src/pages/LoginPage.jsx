// LOGIN: POST /login → guarda token + info del usuario → redirige al feed
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
    setError('');
    try {
      const data = await login(username, password);
      // Guarda token y datos del usuario para usarlos en toda la app
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);
      localStorage.setItem('name', `${data.name} ${data.lastName}`);
      navigate('/'); // redirige al feed
    } catch {
      setError('Credenciales inválidas. Intenta de nuevo.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
      <Paper component="form" onSubmit={handleLogin} elevation={3} sx={{ width: 400, p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" textAlign="center" fontWeight="bold">Post Manager</Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary">Inicia sesión para continuar</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
        <TextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained" size="large">Ingresar</Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
