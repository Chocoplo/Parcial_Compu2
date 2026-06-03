// ============================================================
// ItemForm.jsx — Formulario para crear un nuevo elemento
// ============================================================
// Este componente muestra un formulario con:
//   - Un campo de texto para el nombre del item
//   - Un select para elegir el estado inicial
//   - Un botón "Crear"
//
// Cuando el usuario lo envía, llama a la función onCreated
// que le pasa DashboardPage, con los datos del formulario.
//
// ADAPTAR AL EXAMEN:
//   Solo cambiar las 4 constantes de configuración de abajo.
// ============================================================

import { useState } from "react";
import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";

// ============================================================
// CONFIGURACIÓN — CAMBIAR SEGÚN EL EXAMEN
// ============================================================

// El nombre del campo en el body que espera el backend.
//   VUELOS:  "numeroVuelo"
//   PEDIDOS: "nombreDomiciliario"
const CAMPO_TEXTO = "nombreCampo";

// Texto que aparece como etiqueta del input.
//   VUELOS:  "Número de vuelo"
//   PEDIDOS: "Nombre del domiciliario"
const LABEL_TEXTO = "Nombre del elemento";

// Los mismos estados que en ItemCard (deben coincidir con el backend).
//   VUELOS:  ["PROGRAMADO", "EN_VUELO", "ATERRIZADO"]
//   PEDIDOS: ["EN_CAMINO", "EN_REPARTO", "ENTREGADO"]
const ESTADOS = ["ESTADO_1", "ESTADO_2", "ESTADO_3"];

// El estado que aparece seleccionado por defecto cuando se abre el form.
// Generalmente el primero de la lista.
const ESTADO_INICIAL = "ESTADO_1";

// ============================================================
// Fin configuración
// ============================================================

// ------------------------------------------------------------
// Componente ItemForm
// ------------------------------------------------------------
// Recibe una prop: onCreated (función de DashboardPage)
function ItemForm({ onCreated }) {

    // Estado del input de texto: empieza vacío
    const [valor, setValor] = useState("");

    // Estado del select: empieza con el estado inicial definido arriba
    const [estado, setEstado] = useState(ESTADO_INICIAL);

    // ----------------------------------------------------------
    // handleSubmit — Se ejecuta al enviar el formulario
    // ----------------------------------------------------------
    const handleSubmit = (e) => {
        // Evitar recarga de página
        e.preventDefault();

        // Llamar a onCreated con los datos del formulario.
        // { [CAMPO_TEXTO]: valor } crea dinámicamente el objeto correcto:
        //   Si CAMPO_TEXTO="numeroVuelo" y valor="AV123":
        //   → { numeroVuelo: "AV123", estado: "PROGRAMADO" }
        // DashboardPage.handleCreate recibe este objeto y lo envía al backend.
        onCreated({ [CAMPO_TEXTO]: valor, estado });

        // Limpiar el formulario después de crear
        setValor("");
        setEstado(ESTADO_INICIAL);
    };

    return (
        // Paper = tarjeta con sombra, mb=3 = margen abajo
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>Registrar nuevo elemento</Typography>

            <form onSubmit={handleSubmit}>
                {/* Box con display:flex para poner los campos en fila.
                    flexWrap:"wrap" = si la pantalla es pequeña, se apilan. */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>

                    {/* Campo de texto del nombre */}
                    <TextField
                        label={LABEL_TEXTO}
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        required
                        sx={{ flex: 1, minWidth: 200 }} // ocupa el espacio disponible
                    />

                    {/* Select del estado.
                        TextField con prop "select" actúa como un <select> de HTML.
                        Contiene MenuItem hijos que son las opciones. */}
                    <TextField
                        select            // esto convierte el TextField en un select
                        label="Estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        sx={{ minWidth: 160 }}
                    >
                        {/* .map() itera el array y crea un MenuItem por cada estado.
                            value={e} es lo que se guardará en el estado cuando el usuario lo seleccione.
                            El texto entre las etiquetas ({e}) es lo que ve el usuario en el dropdown. */}
                        {ESTADOS.map((e) => (
                            <MenuItem key={e} value={e}>{e}</MenuItem>
                        ))}
                    </TextField>

                    {/* Botón de envío. alignSelf:"center" = se centra verticalmente */}
                    <Button type="submit" variant="contained" sx={{ alignSelf: "center" }}>
                        Crear
                    </Button>
                </Box>
            </form>
        </Paper>
    );
}

export default ItemForm;
