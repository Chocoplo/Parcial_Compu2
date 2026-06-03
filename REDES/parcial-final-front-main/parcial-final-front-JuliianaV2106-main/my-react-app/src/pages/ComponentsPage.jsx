import { Box, Grid, Typography } from "@mui/material";

import UserCard from "../components/UserCard";
import UserPostForm from "../components/UserPostForm";
import Post from "../components/Post";
import Comments from "../components/Comments";

function ComponentsPage() {
    const post = {
        "id": 1,
        "content": "Primer post de Alice",
        "createdAt": "2025-05-31T14:00:00.000+00:00",
        "user": {
            "id": 2,
            "username": "asmith",
            "email": "asmith@example.com",
            "firstName": "Alice",   
            "lastName": "Smith",
            "phoneNumber": "9876543210"
        },
        "commentsCount": 2,
    };
    const comments = [
        {
            "id": 1,
            "content": "¡Buen post, Alice!",
            "createdAt": "2025-05-31T15:00:00.000+00:00",
            "postId": 1,
            "user": {
                "id": 3,
                "username": "nmartinez",
                "email": "nmartinez@example.com",
                "firstName": "Natalia",
                "lastName": "Martinez",
                "phoneNumber": "3219876543"
            }
        },
        {
            "id": 2,
            "content": "Gracias por compartir.",
            "createdAt": "2025-05-31T15:05:00.000+00:00",
            "postId": 1,
            "user": {
                "id": 3,
                "username": "nmartinez",
                "email": "nmartinez@example.com",
                "firstName": "Natalia",
                "lastName": "Martinez",
                "phoneNumber": "3219876543"
            }
        }
    ];

    return (
        <Box>
            <Typography variant="h2">Página de componentes</Typography>
            <Typography variant="body1">
                Aquí puedes ver ejemplos de los componentes que hemos creado.
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={6}>
                    <UserCard name={`${post.user.firstName} ${post.user.lastName}`} username={post.user.username}/>
                </Grid>
                <Grid size={6}>
                    <UserPostForm name={`${post.user.firstName} ${post.user.lastName}`} username={post.user.username} />
                </Grid>
                <Grid size={6}>
                    <Post post={post} />
                </Grid>
                <Grid size={6}>
                    <Comments comments={comments} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default ComponentsPage;