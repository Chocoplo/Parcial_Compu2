// ============================================================
// ItemCard.jsx — Tarjeta de un elemento individual
// ============================================================
// Este componente representa UN SOLO item de la lista.
// Muestra:
//   - El nombre del item (clickeable para editar inline)
//   - Un Select para cambiar el estado
//   - Un botón para eliminar
//
// ADAPTAR AL EXAMEN:
//   Solo cambiar las 4 constantes de configuración de abajo.
//   El resto del código es SIEMPRE igual.
//
// RECIBE COMO PROPS (parámetros desde DashboardPage):
//   item     → el objeto con los datos: { id, [CAMPO_NOMBRE], estado, ... }
//   onUpdate → función para actualizar en el backend
//   onDelete → función para eliminar en el backend
// ============================================================

// useState: para manejar el estado local de edición (nombre y estado del item)
import { useState } from "react";

// Componentes visuales de MUI
import { Box, Button, Chip, MenuItem, Paper, Select, Typography } from "@mui/material";

// Ícono de basura para el botón eliminar
import DeleteIcon from "@mui/icons-material/Delete";

// ============================================================
// CONFIGURACIÓN — CAMBIAR SEGÚN EL EXAMEN
// ============================================================

// CAMPO_NOMBRE: el nombre de la propiedad en el objeto del backend
// que contiene el "nombre" del item (lo que se muestra en la tarjeta).
//   VUELOS:  "numeroVuelo"         (el objeto tiene item.numeroVuelo)
//   PEDIDOS: "nombreDomiciliario"  (el objeto tiene item.nombreDomiciliario)
const CAMPO_NOMBRE = "nombreCampo";

// LABEL_NOMBRE: texto descriptivo que se muestra debajo del nombre.
// Es solo visual, no afecta la lógica.
//   VUELOS:  "Vuelo"
//   PEDIDOS: "Pedido"
const LABEL_NOMBRE = "Elemento";

// ESTADOS: array con todos los posibles estados del item.
// DEBEN COINCIDIR EXACTAMENTE con los valores del enum en el backend (Java).
// ¿Por qué 3 estados? Porque el examen define exactamente 3 estados para cada entidad.
//   VUELOS:  ["PROGRAMADO", "EN_VUELO", "ATERRIZADO"]
//   PEDIDOS: ["EN_CAMINO", "EN_REPARTO", "ENTREGADO"]
const ESTADOS = ["ESTADO_1", "ESTADO_2", "ESTADO_3"];

// ESTADO_COLOR: mapea cada estado a un color de MUI para el Chip.
// Los colores disponibles en MUI son: "default", "primary", "secondary",
//   "error", "info", "success", "warning"
// La clave debe ser EXACTAMENTE igual al string del array ESTADOS.
//   VUELOS:
//     { PROGRAMADO: "info", EN_VUELO: "warning", ATERRIZADO: "success" }
//   PEDIDOS:
//     { EN_CAMINO: "warning", EN_REPARTO: "info", ENTREGADO: "success" }
const ESTADO_COLOR = {
    ESTADO_1: "info",
    ESTADO_2: "warning",
    ESTADO_3: "success",
};

// ============================================================
// Fin de la configuración
// ============================================================

// ------------------------------------------------------------
// Componente ItemCard
// ------------------------------------------------------------
// Desestructuramos las props: { item, onUpdate, onDelete }
// Es lo mismo que escribir: function ItemCard(props) { const item = props.item; ... }
function ItemCard({ item, onUpdate, onDelete }) {

    // Estado local del SELECT de estado.
    // Empieza con el estado que tiene el item en el backend.
    // Cuando el usuario lo cambia, llamamos al backend y actualizamos aquí.
    const [estado, setEstado] = useState(item.estado);

    // editing: controla si el nombre está en modo lectura (false) o edición (true).
    // Al hacer clic en el nombre, cambia a true y aparece el input.
    const [editing, setEditing] = useState(false);

    // nombre: el texto del campo nombre mientras se edita.
    // item[CAMPO_NOMBRE] accede dinámicamente a la propiedad.
    // Si CAMPO_NOMBRE="numeroVuelo", equivale a item.numeroVuelo
    const [nombre, setNombre] = useState(item[CAMPO_NOMBRE]);

    // ----------------------------------------------------------
    // handleEstadoChange — Cuando el usuario cambia el estado
    // ----------------------------------------------------------
    // Se llama cuando el usuario selecciona otro estado en el Select.
    // e.target.value = el nuevo estado seleccionado (string)
    const handleEstadoChange = (e) => {
        const nuevoEstado = e.target.value;

        // Actualizamos el estado local para que el Select muestre el nuevo valor de inmediato
        setEstado(nuevoEstado);

        // Llamamos al backend para persistir el cambio.
        // Enviamos TODOS los campos porque el backend espera el objeto completo.
        // { [CAMPO_NOMBRE]: nombre } crea dinámicamente { "numeroVuelo": "AV123" }
        //   (o el campo que sea según el examen)
        onUpdate(item.id, { [CAMPO_NOMBRE]: nombre, estado: nuevoEstado });
    };

    // ----------------------------------------------------------
    // handleSaveName — Guardar el nombre editado
    // ----------------------------------------------------------
    // Se llama cuando el usuario hace clic en "Guardar" después de editar.
    const handleSaveName = () => {
        // Llamar al backend con el nombre actualizado (el estado no cambió)
        onUpdate(item.id, { [CAMPO_NOMBRE]: nombre, estado });
        // Salir del modo edición
        setEditing(false);
    };

    // ----------------------------------------------------------
    // JSX — Lo que se ve en pantalla
    // ----------------------------------------------------------
    return (
        // Paper = tarjeta con sombra.
        // display:"flex" + alignItems:"center" = los hijos quedan en fila alineados al centro.
        // flexWrap:"wrap" = si no cabe en una fila, salta a la siguiente.
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>

            {/* Sección del nombre: ocupa el espacio restante (flex: 1) */}
            <Box sx={{ flex: 1 }}>

                {/* Modo edición vs modo lectura */}
                {editing ? (
                    // MODO EDICIÓN: mostramos un input normal de HTML
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} // actualiza el estado al escribir
                            style={{ fontSize: 16, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
                        />
                        <Button size="small" variant="contained" onClick={handleSaveName}>
                            Guardar
                        </Button>
                        <Button size="small" onClick={() => {
                            setEditing(false);               // salir del modo edición
                            setNombre(item[CAMPO_NOMBRE]);   // restaurar el nombre original
                        }}>
                            Cancelar
                        </Button>
                    </Box>
                ) : (
                    // MODO LECTURA: mostramos el nombre como texto clickeable
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                            cursor: "pointer",                           // cursor de mano al pasar encima
                            "&:hover": { textDecoration: "underline" }  // subrayado al hacer hover
                        }}
                        onClick={() => setEditing(true)} // al hacer clic, entrar a modo edición
                    >
                        {nombre}
                    </Typography>
                )}

                {/* Subtítulo pequeño debajo del nombre */}
                <Typography variant="caption" color="text.secondary">
                    {LABEL_NOMBRE} #{item.id}
                </Typography>
            </Box>

            {/* Select de estado — desplegable para cambiar el estado */}
            <Select
                value={estado}           // valor actual del Select (controlado)
                onChange={handleEstadoChange}
                size="small"
                sx={{ minWidth: 150 }}
            >
                {/* Mapeamos el array ESTADOS para crear las opciones.
                    Cada MenuItem es una opción del desplegable.
                    Chip muestra una etiqueta con color según el estado. */}
                {ESTADOS.map((e) => (
                    // key={e} es obligatorio en listas (igual que en .map() anterior)
                    <MenuItem key={e} value={e}>
                        {/* Chip = etiqueta visual con color.
                            ESTADO_COLOR[e] accede al color según el estado actual.
                            Ejemplo: si e="PROGRAMADO" → ESTADO_COLOR["PROGRAMADO"] → "info" */}
                        <Chip label={e} color={ESTADO_COLOR[e]} size="small" />
                    </MenuItem>
                ))}
            </Select>

            {/* Botón eliminar */}
            <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}    // ícono a la izquierda del texto
                onClick={() => onDelete(item.id)} // llamamos a la función que viene de DashboardPage
            >
                Eliminar
            </Button>
        </Paper>
    );
}

export default ItemCard;
