import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Container, Typography, Alert } from "@mui/material";
import { getPedidos, createPedido, updatePedido, deletePedido } from "../api/pedidosApi";
import { clearToken } from "../store/authStore";
import PedidoForm from "../components/PedidoForm";
import PedidoCard from "../components/PedidoCard";

function DashboardPage() {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState("");

    const fetchPedidos = async () => {
        try {
            const res = await getPedidos();
            setPedidos(res.data);
        } catch {
            setError("Error al cargar los pedidos.");
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    const handleCreate = async (data) => {
        try {
            await createPedido(data);
            await fetchPedidos();
        } catch {
            setError("Error al crear el pedido.");
        }
    };

    const handleUpdate = async (id, data) => {
        try {
            await updatePedido(id, data);
            await fetchPedidos();
        } catch {
            setError("Error al actualizar el pedido.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePedido(id);
            setPedidos((prev) => prev.filter((p) => p.id !== id));
        } catch {
            setError("Error al eliminar el pedido.");
        }
    };

    const handleLogout = () => {
        clearToken();
        navigate("/");
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Tablero de Pedidos</Typography>
                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}

            <PedidoForm onCreated={handleCreate} />

            <Typography variant="h6" mb={2}>Pedidos activos</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {pedidos.length === 0 ? (
                    <Typography color="text.secondary">No hay pedidos registrados.</Typography>
                ) : (
                    pedidos.map((pedido) => (
                        <PedidoCard
                            key={pedido.id}
                            pedido={pedido}
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
