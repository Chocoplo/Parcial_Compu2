// DETALLE DE POST: post específico + sus comentarios + formulario para agregar comentario
import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { getPostById, getCommentsByPostId, addComment } from '../api/postsApi';
import UserCard from '../components/UserCard';
import Post from '../components/Post';
import UserPostForm from '../components/UserPostForm';
import Comments from '../components/Comments';

const PostDetailPage = () => {
  // useParams: extrae parámetros de la URL → /posts/:id → { id }
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const name = localStorage.getItem('name');
  const username = localStorage.getItem('username');
  const userId = Number(localStorage.getItem('userId'));

  // ─── useQuery del post ────────────────────────────────────────────────────────
  // queryKey: ['post', id] → el id hace que cada post tenga su propio cache
  // queryFn: () => getPostById(id) → GET /posts/:id
  const { data: post, isLoading: loadingPost } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
  });

  // ─── useQuery de comentarios ──────────────────────────────────────────────────
  // queryKey: ['comments', id] → cache separado por post
  // queryFn: () => getCommentsByPostId(id) → GET /posts/:id/comments
  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getCommentsByPostId(id),
  });

  // ─── useMutation para agregar comentario ─────────────────────────────────────
  // mutationFn: llama POST /posts/:id/comments con { content, userId }
  // onSuccess: invalida ['comments', id] → react-query refetcha los comentarios solos
  const mutation = useMutation({
    mutationFn: (content) => addComment(id, { content, userId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', id] }),
  });

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>

      <Button variant="text" onClick={() => navigate('/')} sx={{ mb: 2 }}>← Volver al feed</Button>

      {/* Componente de usuario autenticado */}
      <Box sx={{ mb: 3 }}>
        <UserCard name={name} username={username} />
      </Box>

      {/* El post específico — loadingPost muestra spinner mientras GET /posts/:id responde */}
      {loadingPost ? <CircularProgress /> : post && <Post post={post} />}

      {/* Formulario de nuevo comentario — onSubmit llama mutation.mutate(content) */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Agregar comentario</Typography>
        <UserPostForm name={name} onSubmit={(content) => mutation.mutate(content)} />
      </Box>

      {/* Lista de comentarios — usa el componente Comments que ya venía en el proyecto */}
      <Typography variant="h6" sx={{ mb: 1 }}>Comentarios</Typography>
      {loadingComments ? <CircularProgress /> : <Comments comments={comments} />}
    </Box>
  );
};

export default PostDetailPage;
