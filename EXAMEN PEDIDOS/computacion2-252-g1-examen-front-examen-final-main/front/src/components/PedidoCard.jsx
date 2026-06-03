import { useState } from "react";
import {
    Box, Button, Chip, MenuItem, Paper, Select, Typography,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DeleteIcon from "@mui/icons-material/Delete";

const ESTADOS = ["EN_CAMINO", "EN_REPARTO", "ENTREGADO"];

const ESTADO_COLOR = {
    EN_CAMINO: "warning",
    EN_REPARTO: "info",
    ENTREGADO: "success",
};

function PedidoCard({ pedido, onUpdate, onDelete }) {
    const [estado, setEstado] = useState(pedido.estado);
    const [editing, setEditing] = useState(false);
    const [nombreDomiciliario, setNombreDomiciliario] = useState(pedido.nombreDomiciliario);

    const handleEstadoChange = (e) => {
        const nuevoEstado = e.target.value;
        setEstado(nuevoEstado);
        onUpdate(pedido.id, { nombreDomiciliario, estado: nuevoEstado });
    };

    const handleUpdateName = () => {
        onUpdate(pedido.id, { nombreDomiciliario, estado });
        setEditing(false);
    };

    return (
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <LocalShippingIcon color="primary" />

            <Box sx={{ flex: 1 }}>
                {editing ? (
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <input
                            value={nombreDomiciliario}
                            onChange={(e) => setNombreDomiciliario(e.target.value)}
                            style={{ fontSize: 16, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
                        />
                        <Button size="small" variant="contained" onClick={handleUpdateName}>Guardar</Button>
                        <Button size="small" onClick={() => { setEditing(false); setNombreDomiciliario(pedido.nombreDomiciliario); }}>Cancelar</Button>
                    </Box>
                ) : (
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                        onClick={() => setEditing(true)}
                    >
                        {nombreDomiciliario}
                    </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                    Pedido #{pedido.id}
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
                onClick={() => onDelete(pedido.id)}
            >
                Eliminar
            </Button>
        </Paper>
    );
}

export default PedidoCard;
