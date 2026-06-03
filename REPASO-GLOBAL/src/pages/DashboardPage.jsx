// ============================================================
// DashboardPage.jsx — Página principal después del login
// ============================================================
// Esta página:
//   1. Carga la lista de items del backend al abrir (useEffect).
//   2. Permite crear nuevos items (ItemForm).
//   3. Muestra cada item con opciones de editar y eliminar (ItemCard).
//   4. Tiene botón de logout.
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Container, Typography, Alert } from "@mui/material";
import { getAll, create } from "../api/genericApi";
import ItemForm from "../components/ItemForm";
import ItemCard from "../components/ItemCard";

function DashboardPage() {
    const navigate = useNavigate();

    // items: el array de objetos que llega del backend
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    // Carga los datos del backend y actualiza el estado
    const fetchItems = async () => {
        try {
            // El interceptor de Axios ya devuelve directamente la data (.data)
            const data = await getAll();
            setItems(data);
        } catch {
            setError("Error al cargar los datos del servidor.");
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Crear un nuevo item
    const handleCreate = async (formData) => {
        try {
            await create(formData);
            fetchItems(); // Refresca la lista
        } catch {
            setError("Error al crear el elemento.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Borra la sesión local
        navigate("/login"); // Redirige al login
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    Tablero de Gestión
                </Typography>
                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Cerrar Sesión
                </Button>
            </Box>

            {/* Alerta de error */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
                    {error}
                </Alert>
            )}

            {/* Formulario de creación */}
            <ItemForm onCreated={handleCreate} />

            <Typography variant="h6" mb={2}>Registros Activos</Typography>

            {/* Listado de Tarjetas */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.length === 0 ? (
                    <Typography color="text.secondary">No hay elementos registrados.</Typography>
                ) : (
                    items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            onRefresh={fetchItems}
                        />
                    ))
                )}
            </Box>
        </Container>
    );
}

export default DashboardPage;
