/**
 * Plantilla de tarjeta de item.
 * Adaptar: label del nombre, ESTADOS, ESTADO_COLOR, ícono
 *
 * VUELOS:  nombreCampo="numeroVuelo",  ESTADOS=["PROGRAMADO","EN_VUELO","ATERRIZADO"]
 * PEDIDOS: nombreCampo="nombreDomiciliario", ESTADOS=["EN_CAMINO","EN_REPARTO","ENTREGADO"]
 */
import { useState } from "react";
import { Box, Button, Chip, MenuItem, Paper, Select, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// --- CONFIGURAR SEGÚN EL EXAMEN ---
const CAMPO_NOMBRE = "nombreCampo";   // ej: "numeroVuelo" o "nombreDomiciliario"
const LABEL_NOMBRE = "Nombre";        // ej: "Número de vuelo"
const ESTADOS = ["ESTADO_1", "ESTADO_2", "ESTADO_3"];
const ESTADO_COLOR = {
    ESTADO_1: "info",
    ESTADO_2: "warning",
    ESTADO_3: "success",
};
// ----------------------------------

function ItemCard({ item, onUpdate, onDelete }) {
    const [estado, setEstado] = useState(item.estado);
    const [editing, setEditing] = useState(false);
    const [nombre, setNombre] = useState(item[CAMPO_NOMBRE]);

    const handleEstadoChange = (e) => {
        const nuevoEstado = e.target.value;
        setEstado(nuevoEstado);
        onUpdate(item.id, { [CAMPO_NOMBRE]: nombre, estado: nuevoEstado });
    };

    const handleSaveName = () => {
        onUpdate(item.id, { [CAMPO_NOMBRE]: nombre, estado });
        setEditing(false);
    };

    return (
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1 }}>
                {editing ? (
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            style={{ fontSize: 16, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
                        />
                        <Button size="small" variant="contained" onClick={handleSaveName}>Guardar</Button>
                        <Button size="small" onClick={() => { setEditing(false); setNombre(item[CAMPO_NOMBRE]); }}>Cancelar</Button>
                    </Box>
                ) : (
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                        onClick={() => setEditing(true)}
                    >
                        {nombre}
                    </Typography>
                )}
                <Typography variant="caption" color="text.secondary">{LABEL_NOMBRE} #{item.id}</Typography>
            </Box>

            <Select value={estado} onChange={handleEstadoChange} size="small" sx={{ minWidth: 150 }}>
                {ESTADOS.map((e) => (
                    <MenuItem key={e} value={e}>
                        <Chip label={e} color={ESTADO_COLOR[e]} size="small" />
                    </MenuItem>
                ))}
            </Select>

            <Button variant="outlined" color="error" size="small" startIcon={<DeleteIcon />} onClick={() => onDelete(item.id)}>
                Eliminar
            </Button>
        </Paper>
    );
}

export default ItemCard;
