/**
 * Plantilla de DashboardPage.
 * 1. Cambiar "items" por el nombre real (vuelos, pedidos, etc.)
 * 2. Cambiar las importaciones de la API
 * 3. Ajustar el componente ItemCard y ItemForm al dominio del examen
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Container, Typography, Alert } from "@mui/material";
import { getAll, create, update, remove } from "../api/genericApi";
import { clearToken } from "../store/authStore";
import ItemForm from "../components/ItemForm";
import ItemCard from "../components/ItemCard";

function DashboardPage() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    const fetchItems = async () => {
        try {
            const res = await getAll();
            setItems(res.data);
        } catch {
            setError("Error al cargar los datos.");
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleCreate = async (data) => {
        try {
            await create(data);
            await fetchItems();
        } catch {
            setError("Error al crear.");
        }
    };

    const handleUpdate = async (id, data) => {
        try {
            await update(id, data);
            await fetchItems();
        } catch {
            setError("Error al actualizar.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove(id);
            setItems((prev) => prev.filter((item) => item.id !== id));
        } catch {
            setError("Error al eliminar.");
        }
    };

    const handleLogout = () => {
        clearToken();
        navigate("/");
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Tablero</Typography>
                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

            <ItemForm onCreated={handleCreate} />

            <Typography variant="h6" mb={2}>Lista</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.length === 0 ? (
                    <Typography color="text.secondary">No hay elementos registrados.</Typography>
                ) : (
                    items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </Box>
        </Container>
    );
}

export default DashboardPage;
