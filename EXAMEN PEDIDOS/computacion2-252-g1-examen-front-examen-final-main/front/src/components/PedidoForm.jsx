import { useState } from "react";
import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";

const ESTADOS = ["EN_CAMINO", "EN_REPARTO", "ENTREGADO"];

function PedidoForm({ onCreated }) {
    const [nombreDomiciliario, setNombreDomiciliario] = useState("");
    const [estado, setEstado] = useState("EN_CAMINO");

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreated({ nombreDomiciliario, estado });
        setNombreDomiciliario("");
        setEstado("EN_CAMINO");
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>Registrar nuevo pedido</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                        label="Nombre del domiciliario"
                        value={nombreDomiciliario}
                        onChange={(e) => setNombreDomiciliario(e.target.value)}
                        required
                        sx={{ flex: 1, minWidth: 200 }}
                    />
                    <TextField
                        select
                        label="Estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        sx={{ minWidth: 160 }}
                    >
                        {ESTADOS.map((e) => (
                            <MenuItem key={e} value={e}>{e}</MenuItem>
                        ))}
                    </TextField>
                    <Button type="submit" variant="contained" sx={{ alignSelf: "center" }}>
                        Crear
                    </Button>
                </Box>
            </form>
        </Paper>
    );
}

export default PedidoForm;
