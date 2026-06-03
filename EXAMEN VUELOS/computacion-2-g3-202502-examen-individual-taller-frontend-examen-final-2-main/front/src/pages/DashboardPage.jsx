import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Container, Typography, Alert } from "@mui/material";
import { getVuelos, createVuelo, updateVuelo, deleteVuelo } from "../api/vuelosApi";
import { clearToken } from "../store/authStore";
import VueloForm from "../components/VueloForm";
import VueloCard from "../components/VueloCard";

function DashboardPage() {
    const navigate = useNavigate();
    const [vuelos, setVuelos] = useState([]);
    const [error, setError] = useState("");

    const fetchVuelos = async () => {
        try {
            const res = await getVuelos();
            setVuelos(res.data);
        } catch {
            setError("Error al cargar los vuelos.");
        }
    };

    useEffect(() => {
        fetchVuelos();
    }, []);

    const handleCreate = async (data) => {
        try {
            await createVuelo(data);
            await fetchVuelos();
        } catch {
            setError("Error al crear el vuelo.");
        }
    };

    const handleUpdate = async (id, data) => {
        try {
            await updateVuelo(id, data);
            await fetchVuelos();
        } catch {
            setError("Error al actualizar el vuelo.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteVuelo(id);
            setVuelos((prev) => prev.filter((v) => v.id !== id));
        } catch {
            setError("Error al eliminar el vuelo.");
        }
    };

    const handleLogout = () => {
        clearToken();
        navigate("/");
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Tablero de Vuelos</Typography>
                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

            <VueloForm onCreated={handleCreate} />

            <Typography variant="h6" mb={2}>Vuelos registrados</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {vuelos.length === 0 ? (
                    <Typography color="text.secondary">No hay vuelos registrados.</Typography>
                ) : (
                    vuelos.map((vuelo) => (
                        <VueloCard
                            key={vuelo.id}
                            vuelo={vuelo}
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
