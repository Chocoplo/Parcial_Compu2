import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, Button, Container, Typography, Alert } from "@mui/material";
import { getPostById, getCommentsByPost, addComment, getMe } from "../api/postsApi";
import UserCard from "../components/UserCard";
import Post from "../components/Post";
import Comments from "../components/Comments";
import UserPostForm from "../components/UserPostForm";

function PostDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getMe().then((res) => setUser(res.data)).catch(() => {});
        getPostById(id).then((res) => setPost(res.data)).catch(() => setError("Error al cargar el post."));
        fetchComments();
    }, [id]);

    const fetchComments = async () => {
        try {
            const res = await getCommentsByPost(id);
            setComments(res.data);
        } catch {
            setError("Error al cargar los comentarios.");
        }
    };

    const handleAddComment = async (content) => {
        try {
            await addComment(id, content);
            await fetchComments();
        } catch {
            setError("Error al agregar el comentario.");
        }
    };

    const fullName = user ? `${user.firstName} ${user.lastName}` : "";

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Button variant="text" onClick={() => navigate("/feed")} sx={{ mb: 2 }}>
                ← Volver al feed
            </Button>

            {user && <UserCard name={fullName} username={user.username} />}

            {error && <Alert severity="error" sx={{ my: 2 }} onClose={() => setError("")}>{error}</Alert>}

            {post && (
                <Box sx={{ mt: 3 }}>
                    <Post post={post} />
                </Box>
            )}

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" mb={1}>Agregar comentario</Typography>
                <UserPostForm name={fullName} onSubmit={handleAddComment} />
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" mb={1}>Comentarios</Typography>
                <Comments comments={comments} />
            </Box>
        </Container>
    );
}

export default PostDetailPage;
