import { useState } from "react";
import {
    Box, Button, Chip, MenuItem, Paper, Select, Typography,
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import DeleteIcon from "@mui/icons-material/Delete";

const ESTADOS = ["PROGRAMADO", "EN_VUELO", "ATERRIZADO"];

const ESTADO_COLOR = {
    PROGRAMADO: "info",
    EN_VUELO: "warning",
    ATERRIZADO: "success",
};

function VueloCard({ vuelo, onUpdate, onDelete }) {
    const [estado, setEstado] = useState(vuelo.estado);
    const [editing, setEditing] = useState(false);
    const [numeroVuelo, setNumeroVuelo] = useState(vuelo.numeroVuelo);

    const handleEstadoChange = (e) => {
        const nuevoEstado = e.target.value;
        setEstado(nuevoEstado);
        onUpdate(vuelo.id, { numeroVuelo, estado: nuevoEstado });
    };

    const handleUpdateName = () => {
        onUpdate(vuelo.id, { numeroVuelo, estado });
        setEditing(false);
    };

    return (
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <FlightIcon color="primary" />

            <Box sx={{ flex: 1 }}>
                {editing ? (
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <input
                            value={numeroVuelo}
                            onChange={(e) => setNumeroVuelo(e.target.value)}
                            style={{ fontSize: 16, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
                        />
                        <Button size="small" variant="contained" onClick={handleUpdateName}>Guardar</Button>
                        <Button size="small" onClick={() => { setEditing(false); setNumeroVuelo(vuelo.numeroVuelo); }}>Cancelar</Button>
                    </Box>
                ) : (
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                        onClick={() => setEditing(true)}
                    >
                        {numeroVuelo}
                    </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                    Aerolínea: {vuelo.nombreAerolinea}
                </Typography>
            </Box>

            <Select
                value={estado}
                onChange={handleEstadoChange}
                size="small"
                sx={{ minWidth: 150 }}
            >
                {ESTADOS.map((e) => (
                    <MenuItem key={e} value={e}>
                        <Chip label={e} color={ESTADO_COLOR[e]} size="small" />
                    </MenuItem>
                ))}
            </Select>

            <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => onDelete(vuelo.id)}
            >
                Eliminar
            </Button>
        </Paper>
    );
}

export default VueloCard;
