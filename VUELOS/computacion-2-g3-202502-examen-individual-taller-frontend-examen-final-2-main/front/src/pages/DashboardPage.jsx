import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, Divider, Alert, Paper } from '@mui/material';
import { getVuelos, createVuelo } from '../api/vuelosApi';
import VueloCard from '../components/VueloCard';

const ESTADOS = ['PROGRAMADO', 'EN_VUELO', 'ATERRIZADO'];

const DashboardPage = () => {
  const [vuelos, setVuelos] = useState([]);
  const [numeroVuelo, setNumeroVuelo] = useState('');
  const [estado, setEstado] = useState('PROGRAMADO');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // El JWT no incluye aerolineaId → lo extraemos del primer vuelo que devuelve el GET
  const aerolineaIdRef = useRef(null);

  // Carga los vuelos de la aerolínea autenticada → GET /vuelos (token via interceptor)
  // Se llama al montar y después de cada crear/actualizar/eliminar
  const fetchVuelos = async () => {
    const data = await getVuelos();
    setVuelos(data);
    if (data.length > 0 && !aerolineaIdRef.current) aerolineaIdRef.current = data[0].aerolineaId;
  };

  useEffect(() => { fetchVuelos(); }, []);

  // (20%) CREAR VUELO → POST /vuelos con { numeroVuelo, estado, aerolineaId }
  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createVuelo({ numeroVuelo, estado, aerolineaId: aerolineaIdRef.current });
      setNumeroVuelo('');
      setEstado('PROGRAMADO');
      fetchVuelos(); // refresca la lista después de crear
    } catch {
      setError('Error al crear el vuelo.');
    }
  };

  // Cierra sesión: borra el token y redirige al login
  const handleLogout = () => { localStorage.removeItem('token'); navigate('/login'); };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">Tablero de Vuelos</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>Cerrar Sesión</Button>
      </Box>

      {/* (20%) Formulario para crear nuevo vuelo */}
      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Nuevo Vuelo</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleCreate} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField label="Número de vuelo" value={numeroVuelo} onChange={(e) => setNumeroVuelo(e.target.value)} required size="small" sx={{ flex: 1, minWidth: 200 }} />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Estado</InputLabel>
            <Select value={estado} label="Estado" onChange={(e) => setEstado(e.target.value)}>
              {ESTADOS.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">Crear</Button>
        </Box>
      </Paper>

      <Divider sx={{ mb: 3 }} />

      {/* Lista de vuelos — cada card puede actualizar estado y eliminar */}
      <Typography variant="h6" sx={{ mb: 2 }}>Vuelos programados ({vuelos.length})</Typography>
      {vuelos.length === 0
        ? <Typography color="text.secondary">No hay vuelos registrados aún.</Typography>
        : vuelos.map((vuelo) => <VueloCard key={vuelo.id} vuelo={vuelo} onRefresh={fetchVuelos} />)
      }
    </Box>
  );
};

export default DashboardPage;
