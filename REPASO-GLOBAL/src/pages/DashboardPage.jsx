// ============================================================
// DashboardPage.jsx — Página principal después del login
// ============================================================
// Esta página:
//   1. Carga la lista de items del backend al abrir (useEffect)
//   2. Permite crear nuevos items (ItemForm)
//   3. Muestra cada item con opciones de editar y eliminar (ItemCard)
//   4. Tiene botón de logout
//
// ADAPTAR AL EXAMEN:
//   - Cambiar las importaciones de getAll/create/update/remove
//     por las funciones reales (ej: getVuelos, createVuelo, etc.)
//   - Cambiar ItemForm e ItemCard por los componentes del dominio
//   - Cambiar el título del Typography
// ============================================================

// useEffect: hook que ejecuta código cuando el componente se monta
//            (o cuando cambian sus dependencias).
//            Aquí lo usamos para cargar datos al abrir la página.
// useState: para guardar la lista de items y el mensaje de error.
import { useEffect, useState } from "react";

// useNavigate: para redirigir al login cuando el usuario hace logout
import { useNavigate } from "react-router";

// Componentes visuales de MUI
import { Box, Button, Container, Typography, Alert } from "@mui/material";

// Las 4 operaciones básicas del backend (CRUD)
// Cambiar según el examen:
//   VUELOS:  import { getVuelos, createVuelo, updateVuelo, deleteVuelo } from "../api/vuelosApi";
//   PEDIDOS: import { getPedidos, createPedido, updatePedido, deletePedido } from "../api/pedidosApi";
import { getAll, create, update, remove } from "../api/genericApi";

// clearToken borra el token del localStorage y el store (logout)
import { clearToken } from "../store/authStore";

// Componentes del dominio. Cambiar por los del examen:
//   VUELOS:  import VueloForm, VueloCard
//   PEDIDOS: import PedidoForm, PedidoCard
import ItemForm from "../components/ItemForm";
import ItemCard from "../components/ItemCard";

// ------------------------------------------------------------
// Componente DashboardPage
// ------------------------------------------------------------
function DashboardPage() {
    const navigate = useNavigate();

    // items: el array de objetos que llega del backend
    // Ejemplo VUELOS: [{ id:1, numeroVuelo:"AV123", estado:"PROGRAMADO", ... }, ...]
    const [items, setItems] = useState([]); // empieza como array vacío

    // error: texto del mensaje de error, o "" si no hay error
    const [error, setError] = useState("");

    // ----------------------------------------------------------
    // fetchItems — Pedir los datos al backend y guardarlos
    // ----------------------------------------------------------
    // Esta función hace GET al backend y actualiza el estado "items".
    // La llamamos: al montar la página, y después de crear/actualizar.
    const fetchItems = async () => {
        try {
            // await espera la respuesta del backend
            const res = await getAll(); // hace GET /RUTA
            // res.data es el array de objetos que devuelve el backend
            setItems(res.data); // actualizamos el estado → React re-renderiza
        } catch {
            setError("Error al cargar los datos.");
        }
    };

    // ----------------------------------------------------------
    // useEffect — Ejecutar código al montar el componente
    // ----------------------------------------------------------
    // useEffect(función, [dependencias])
    // El array vacío [] significa "ejecutar SOLO al montar la página"
    // (equivalente a componentDidMount en clases).
    // Sin el [], se ejecutaría en cada re-render (bucle infinito).
    useEffect(() => {
        fetchItems(); // cargamos los datos cuando abre la página
    }, []); // [] = solo al montar

    // ----------------------------------------------------------
    // handleCreate — Crear un nuevo item
    // ----------------------------------------------------------
    // Esta función la pasamos a ItemForm. Se llama cuando el usuario
    // envía el formulario de creación.
    // "data" es el objeto con los campos del formulario.
    const handleCreate = async (data) => {
        try {
            await create(data); // POST /RUTA con los datos
            await fetchItems(); // refrescar la lista (para ver el nuevo item)
        } catch {
            setError("Error al crear.");
        }
    };

    // ----------------------------------------------------------
    // handleUpdate — Actualizar un item (nombre o estado)
    // ----------------------------------------------------------
    // Se llama desde ItemCard cuando el usuario:
    //   a) Guarda un nombre editado, o
    //   b) Cambia el estado en el Select
    // "id" es el id del item a actualizar.
    // "data" tiene los campos actualizados: { campo, estado }.
    const handleUpdate = async (id, data) => {
        try {
            await update(id, data); // PUT /RUTA/{id}
            await fetchItems();     // refrescar lista
        } catch {
            setError("Error al actualizar.");
        }
    };

    // ----------------------------------------------------------
    // handleDelete — Eliminar un item
    // ----------------------------------------------------------
    // Se llama desde ItemCard cuando el usuario hace clic en "Eliminar".
    // Primero llama al backend, luego actualiza la lista localmente
    // sin hacer otro GET (más rápido = "actualización optimista").
    const handleDelete = async (id) => {
        try {
            await remove(id); // DELETE /RUTA/{id}

            // filter crea un nuevo array sin el item eliminado.
            // (prev) => prev.filter(...) recibe el array actual y devuelve uno nuevo.
            // item.id !== id → incluir todos EXCEPTO el que tiene ese id.
            setItems((prev) => prev.filter((item) => item.id !== id));
        } catch {
            setError("Error al eliminar.");
        }
    };

    // ----------------------------------------------------------
    // handleLogout — Cerrar sesión
    // ----------------------------------------------------------
    const handleLogout = () => {
        clearToken();      // borra el token del localStorage y el store
        navigate("/");     // redirige al login
    };

    // ----------------------------------------------------------
    // JSX — Lo que se muestra en pantalla
    // ----------------------------------------------------------
    return (
        // Container maxWidth="md" = ancho máximo mediano (~960px), centrado
        <Container maxWidth="md" sx={{ py: 4 }}>

            {/* Fila superior: título a la izquierda, botón logout a la derecha.
                justifyContent: "space-between" = empuja los elementos a los extremos */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    Tablero
                    {/* Cambiar según el examen: "Tablero de Vuelos" / "Tablero de Pedidos" */}
                </Typography>
                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </Box>

            {/* Mensaje de error. onClose limpia el error al hacer clic en la X */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
                    {error}
                </Alert>
            )}

            {/* Formulario de creación.
                onCreated es una prop (parámetro) que le pasamos al componente hijo.
                Cuando el usuario envía el form, ItemForm llama a onCreated(datos). */}
            <ItemForm onCreated={handleCreate} />

            <Typography variant="h6" mb={2}>Lista</Typography>

            {/* Box con flex + column = apila los elementos verticalmente con gap entre ellos */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Renderizado condicional:
                    Si no hay items → mostrar mensaje.
                    Si hay items → mostrar uno por uno con .map() */}
                {items.length === 0 ? (
                    <Typography color="text.secondary">No hay elementos registrados.</Typography>
                ) : (
                    // .map() itera el array y devuelve un componente por cada item.
                    // key={item.id} es obligatorio en listas: ayuda a React a identificar cada elemento.
                    items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}              // le pasamos los datos del item
                            onUpdate={handleUpdate}  // función para actualizar
                            onDelete={handleDelete}  // función para eliminar
                        />
                    ))
                )}
            </Box>

            {/* ================================================================
                CÓMO AGREGAR MÁS COSAS QUE PIDA EL PROFESOR
                ================================================================

                1. NUEVA SECCIÓN en la misma página:
                   Agrega otro <Box> debajo del de la lista con lo que necesites.

                2. NUEVA PÁGINA (ej: /detalle):
                   a) Crear el archivo src/pages/DetallePage.jsx
                   b) En Router.jsx agregar:
                        { path: "/detalle/:id", element: <ProtectedRoute><DetallePage /></ProtectedRoute> }
                   c) En ItemCard.jsx agregar un botón que llame: navigate("/detalle/" + item.id)

                3. NUEVO CAMPO en el formulario:
                   Agregar un TextField más en ItemForm.jsx
                   y agregar el campo al objeto que se envía en handleSubmit.

                4. FILTRAR la lista por estado:
                   Agrega un Select arriba del listado y filtra con:
                   items.filter(item => item.estado === filtroSeleccionado)

                5. MOSTRAR DATOS DEL USUARIO logueado (como en REDSOCIAL):
                   a) Importar: import { getMe } from "../api/genericApi";
                   b) Agregar estado: const [user, setUser] = useState(null);
                   c) En useEffect: getMe().then(res => setUser(res.data))
                   d) Mostrar: <Typography>{user?.firstName} {user?.lastName}</Typography>
                      El ?. (optional chaining) evita errores si user es null.
                ================================================================ */}
        </Container>
    );
}

export default DashboardPage;
