import { Box, Paper, Typography } from "@mui/material";

import { relativeTimeConversion } from "../utils/RelativeTime";

import CustomAvatar from "./CustomAvatar";

function Post({ post }) {
    const relativeTime = relativeTimeConversion(post.createdAt);

    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                paddingY: 2,
                borderRadius: 3,
                boxShadow: 3,
                paddingX: 2,
                width: "100%",
                maxWidth: 600,
                marginBottom: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingY: 1,
                    height: "fit-content",
                    width: "100%"
                }}
            >
                <CustomAvatar name={`${post.user.firstName} ${post.user.lastName}`} />
                <Box sx={{ mt: 1, textAlign: "start" }}>
                    <Typography variant="h6">{`${post.user.firstName} ${post.user.lastName}`}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">@{post.user.username}</Typography>
                </Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
                {post.content}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="caption" color="textSecondary">
                    {relativeTime}
                </Typography>
            </Box>
            <Box
                sx={{
                    mt: 1,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    backgroundColor: "#f0f0f0",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "text.secondary",
                    display: "inline-block"
                }}
            >
                {post.commentsCount} comentario{(post.commentsCount === 1) ? "" : "s"}
            </Box>
        </Paper>
    );
}

export default Post;