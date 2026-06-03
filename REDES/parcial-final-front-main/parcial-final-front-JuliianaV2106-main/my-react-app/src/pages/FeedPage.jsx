// FEED: muestra usuario autenticado, formulario de nuevo post y lista de posts
import { useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { getPosts, createPost } from '../api/postsApi';
import UserCard from '../components/UserCard';
import UserPostForm from '../components/UserPostForm';
import Post from '../components/Post';

const FeedPage = () => {
  const navigate = useNavigate();

  // useQueryClient: permite acceder al cache de react-query para invalidar/refrescar datos
  const queryClient = useQueryClient();

  // Datos del usuario guardados en localStorage al hacer login
  // LoginDtoOut: { token, username, name, lastName, userId }
  const name = localStorage.getItem('name');
  const username = localStorage.getItem('username');
  const userId = Number(localStorage.getItem('userId'));

  // ─── useQuery ───────────────────────────────────────────────────────────────
  // Reemplaza el useEffect + useState para fetch de datos
  // queryKey: ['posts'] → clave única del cache. Si otro componente usa la misma key, comparte datos
  // queryFn: función que hace el GET → devuelve la data
  // data: los posts ([] por defecto para evitar undefined)
  // isLoading: true mientras espera la respuesta
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  // ─── useMutation ─────────────────────────────────────────────────────────────
  // Para operaciones que MODIFICAN datos (POST, PUT, DELETE)
  // mutationFn: función que hace la petición al backend
  // onSuccess: se ejecuta cuando la mutación es exitosa
  // invalidateQueries: marca el cache de ['posts'] como desactualizado → react-query lo refetcha solo
  const mutation = useMutation({
    mutationFn: (content) => createPost({ content, userId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  // mutation.mutate(content) → llama a mutationFn con el contenido del post

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">Feed</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>Cerrar Sesión</Button>
      </Box>

      {/* Componente de usuario autenticado con su información */}
      <Box sx={{ mb: 3 }}>
        <UserCard name={name} username={username} />
      </Box>

      {/* Formulario de nuevo post — onSubmit recibe el texto y llama mutation.mutate() */}
      <Box sx={{ mb: 3 }}>
        <UserPostForm name={name} onSubmit={(content) => mutation.mutate(content)} />
      </Box>

      {/* Lista de posts — isLoading muestra spinner mientras carga */}
      {/* Al hacer clic en un post navega a /posts/:id (detalle + comentarios) */}
      {isLoading ? (
        <CircularProgress />
      ) : (
        posts.map((post) => (
          <Box key={post.id} onClick={() => navigate(`/posts/${post.id}`)} sx={{ cursor: 'pointer' }}>
            <Post post={post} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default FeedPage;
