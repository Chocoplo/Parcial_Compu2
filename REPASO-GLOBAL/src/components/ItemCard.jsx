// ============================================================
// ItemCard.jsx — Tarjeta de un elemento individual
// ============================================================
// Este componente representa UN SOLO item de la lista.
// Realiza sus propias peticiones al backend (actualizar/borrar)
// y notifica al Dashboard principal mediante "onRefresh" para recargar.
// ============================================================

import { useState } from "react";
import { Box, Button, Chip, MenuItem, Paper, Select, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { update, remove } from "../api/genericApi";

const CAMPO_NOMBRE = "nombreCampo";
const LABEL_NOMBRE = "Elemento";
const ESTADOS = ["ESTADO_1", "ESTADO_2", "ESTADO_3"];
const ESTADO_COLOR = {
    ESTADO_1: "info",
    ESTADO_2: "warning",
    ESTADO_3: "success",
};

function ItemCard({ item, onRefresh }) {
    const [estado, setEstado] = useState(item.estado);
    const [editing, setEditing] = useState(false);
    const [nombre, setNombre] = useState(item[CAMPO_NOMBRE]);
    const [loading, setLoading] = useState(false);

    // Actualiza el estado cuando el usuario selecciona otro valor en el Select
    const handleEstadoChange = async (e) => {
        const nuevoEstado = e.target.value;
        setEstado(nuevoEstado);
        setLoading(true);

        try {
            // El backend suele requerir el objeto completo al hacer PUT
            await update(item.id, { [CAMPO_NOMBRE]: nombre, estado: nuevoEstado });
            onRefresh(); // Sincroniza con el listado del dashboard
        } catch {
            setEstado(item.estado); // Revierte si falla
        } finally {
            setLoading(false);
        }
    };

    // Guarda el nombre modificado
    const handleSaveName = async () => {
        setLoading(true);
        try {
            await update(item.id, { [CAMPO_NOMBRE]: nombre, estado });
            onRefresh();
            setEditing(false);
        } catch {
            setNombre(item[CAMPO_NOMBRE]); // Revierte si falla
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`¿Seguro que deseas eliminar el registro con ID ${item.id}?`)) return;
        try {
            await remove(item.id);
            onRefresh(); // Notifica para recargar el listado en el Dashboard
        } catch {
            alert("Error al eliminar el elemento.");
        }
    };

    return (
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: 1 }}>
                {editing ? (
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            disabled={loading}
                            style={{ fontSize: 16, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
                        />
                        <Button size="small" variant="contained" onClick={handleSaveName} disabled={loading}>
                            Guardar
                        </Button>
                        <Button size="small" disabled={loading} onClick={() => {
                            setEditing(false);
                            setNombre(item[CAMPO_NOMBRE]);
                        }}>
                            Cancelar
                        </Button>
                    </Box>
                ) : (
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" }
                        }}
                        onClick={() => setEditing(true)}
                    >
                        {nombre}
                    </Typography>
                )}

                <Typography variant="caption" color="text.secondary">
                    {LABEL_NOMBRE} #{item.id}
                </Typography>
            </Box>

            <Select
                value={estado}
                onChange={handleEstadoChange}
                size="small"
                disabled={loading}
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
                disabled={loading}
                onClick={handleDelete}
            >
                Eliminar
            </Button>
        </Paper>
    );
}

export default ItemCard;
