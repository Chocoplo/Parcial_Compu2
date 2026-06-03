import { Box, Paper, Typography } from "@mui/material";

import CustomAvatar from "./CustomAvatar";

function UserCard({name, username}) {

    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingY: 1,
                borderRadius: 3,
                boxShadow: 3,
                paddingX: 2,
                height: "fit-content",
                width: "fit-content",
            }}
        >
            <CustomAvatar name={name} />
            <Box sx={{ mt: 1, textAlign: "start" }}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">@{username}</Typography>
            </Box>
        </Paper>
    );
};

export default UserCard;