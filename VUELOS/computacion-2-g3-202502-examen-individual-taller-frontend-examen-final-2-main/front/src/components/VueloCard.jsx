import { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Select, MenuItem, Button, FormControl, InputLabel, Chip, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateVuelo, deleteVuelo } from '../api/vuelosApi';

const ESTADOS = ['PROGRAMADO', 'EN_VUELO', 'ATERRIZADO'];
const estadoColor = { PROGRAMADO: 'info', EN_VUELO: 'warning', ATERRIZADO: 'success' };

// (20%) COMPONENTE: representa visualmente un vuelo individual
// Props: vuelo = { id, numeroVuelo, estado, aerolineaId, nombreAerolinea }
//        onRefresh = función del Dashboard para recargar la lista tras cambios
const VueloCard = ({ vuelo, onRefresh }) => {
  const [estado, setEstado] = useState(vuelo.estado);
  const [loading, setLoading] = useState(false);

  // (20%) ACTUALIZAR ESTADO → PUT /vuelos/:id
  // Hay que enviar el objeto completo: numeroVuelo + nuevo estado + aerolineaId
  const handleEstadoChange = async (nuevoEstado) => {
    setEstado(nuevoEstado); // actualiza la UI antes de esperar al backend (optimista)
    setLoading(true);
    try {
      await updateVuelo(vuelo.id, { numeroVuelo: vuelo.numeroVuelo, estado: nuevoEstado, aerolineaId: vuelo.aerolineaId });
      onRefresh(); // sincroniza con el backend recargando la lista
    } catch { setEstado(vuelo.estado); } // revierte si falla
    finally { setLoading(false); }
  };

  // (20%) ELIMINAR VUELO → DELETE /vuelos/:id
  // Después de eliminar llama onRefresh para quitarlo de la vista
  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar el vuelo ${vuelo.numeroVuelo}?`)) return;
    await deleteVuelo(vuelo.id);
    onRefresh();
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        {/* Muestra toda la información del vuelo + chip de color por estado */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">{vuelo.numeroVuelo}</Typography>
          <Chip label={estado} color={estadoColor[estado]} size="small" />
        </Box>
        {/* nombreAerolinea viene del VueloResponse del backend */}
        <Typography variant="body2" color="text.secondary">ID: {vuelo.id} | Aerolínea: {vuelo.nombreAerolinea}</Typography>

        {/* Select con los 3 estados posibles: PROGRAMADO, EN_VUELO, ATERRIZADO */}
        <FormControl fullWidth sx={{ mt: 2 }} size="small">
          <InputLabel>Estado</InputLabel>
          <Select value={estado} label="Estado" onChange={(e) => handleEstadoChange(e.target.value)} disabled={loading}>
            {ESTADOS.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
          </Select>
        </FormControl>
      </CardContent>

      {/* Botón de eliminación visible y claro */}
      <CardActions>
        <Button color="error" startIcon={<DeleteIcon />} onClick={handleDelete} size="small">Eliminar</Button>
      </CardActions>
    </Card>
  );
};

export default VueloCard;
