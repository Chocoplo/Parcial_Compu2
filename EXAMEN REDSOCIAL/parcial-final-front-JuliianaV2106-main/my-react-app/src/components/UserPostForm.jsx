import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";

import CustomAvatar from "./CustomAvatar";

function UserPostForm({ name, onSubmit }) {
    const [post, setPost] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(post);
        setPost("");
    };

    return (
        <Paper
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                boxShadow: 3,
                width: "100%",
                minWidth: 200,
                maxWidth: 600,
            }}
        >
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <CustomAvatar name={name} />
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder={`¿Qué estás pensando, ${name}?`}
                        multiline
                        rows={4}
                        sx={{ m: 2 }}
                        name="post"
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <Button type="submit" variant="contained">
                        Enviar
                    </Button>
                </Box>
            </form>
        </Paper>
    );
}

export default UserPostForm;