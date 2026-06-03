/**
 * Plantilla de formulario de creación.
 *
 * VUELOS:  campos = [{ name: "numeroVuelo", label: "Número de vuelo" }]
 * PEDIDOS: campos = [{ name: "nombreDomiciliario", label: "Nombre del domiciliario" }]
 */
import { useState } from "react";
import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";

// --- CONFIGURAR SEGÚN EL EXAMEN ---
const CAMPO_TEXTO = "nombreCampo";   // ej: "numeroVuelo"
const LABEL_TEXTO = "Nombre";        // ej: "Número de vuelo"
const ESTADOS = ["ESTADO_1", "ESTADO_2", "ESTADO_3"];
const ESTADO_INICIAL = "ESTADO_1";
// ----------------------------------

function ItemForm({ onCreated }) {
    const [valor, setValor] = useState("");
    const [estado, setEstado] = useState(ESTADO_INICIAL);

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreated({ [CAMPO_TEXTO]: valor, estado });
        setValor("");
        setEstado(ESTADO_INICIAL);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>Registrar nuevo elemento</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                        label={LABEL_TEXTO}
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
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

export default ItemForm;
