import { useState } from "react";
import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";

const ESTADOS = ["PROGRAMADO", "EN_VUELO", "ATERRIZADO"];

function VueloForm({ onCreated }) {
    const [numeroVuelo, setNumeroVuelo] = useState("");
    const [estado, setEstado] = useState("PROGRAMADO");

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreated({ numeroVuelo, estado });
        setNumeroVuelo("");
        setEstado("PROGRAMADO");
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>Registrar nuevo vuelo</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                        label="Número de vuelo"
                        value={numeroVuelo}
                        onChange={(e) => setNumeroVuelo(e.target.value)}
                        required
                        sx={{ flex: 1, minWidth: 180 }}
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

export default VueloForm;
