import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Container, Typography, Alert } from "@mui/material";
import { getPosts, createPost, getMe } from "../api/postsApi";
import { clearToken } from "../store/authStore";
import UserCard from "../components/UserCard";
import UserPostForm from "../components/UserPostForm";
import Post from "../components/Post";

function FeedPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getMe()
            .then((res) => setUser(res.data))
            .catch(() => {});
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await getPosts();
            setPosts(res.data);
        } catch {
            setError("Error al cargar los posts.");
        }
    };

    const handleCreatePost = async (content) => {
        try {
            await createPost(content);
            await fetchPosts();
        } catch {
            setError("Error al publicar el post.");
        }
    };

    const handleLogout = () => {
        clearToken();
        navigate("/");
    };

    const fullName = user ? `${user.firstName} ${user.lastName}` : "";

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">Feed</Typography>
                <Button variant="outlined" color="error" size="small" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </Box>

            {user && <UserCard name={fullName} username={user.username} />}

            {error && <Alert severity="error" sx={{ my: 2 }} onClose={() => setError("")}>{error}</Alert>}

            <Box sx={{ mt: 3 }}>
                <UserPostForm name={fullName} onSubmit={handleCreatePost} />
            </Box>

            <Box sx={{ mt: 3 }}>
                {posts.map((post) => (
                    <Box
                        key={post.id}
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/posts/${post.id}`)}
                    >
                        <Post post={post} />
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default FeedPage;
