import axiosInstance from './axiosInstance';

// GET todos los vuelos de la aerolínea autenticada → /vuelos
export const getVuelos = () => axiosInstance.get('/vuelos');

// (20%) CREAR VUELO → POST /vuelos
// body: { numeroVuelo: string, estado: "PROGRAMADO"|"EN_VUELO"|"ATERRIZADO", aerolineaId: number }
export const createVuelo = (body) => axiosInstance.post('/vuelos', body);

// (20%) ACTUALIZAR VUELO → PUT /vuelos/:id
// body: { numeroVuelo, estado, aerolineaId }
export const updateVuelo = (id, body) => axiosInstance.put(`/vuelos/${id}`, body);

// (20%) ELIMINAR VUELO → DELETE /vuelos/:id
export const deleteVuelo = (id) => axiosInstance.delete(`/vuelos/${id}`);
