import { Box, Divider, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";

import { relativeTimeConversion } from "../utils/RelativeTime";

import CustomAvatar from "./CustomAvatar";

function Comments({ comments }) {
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
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <>
                        <Box
                            key={index}
                            sx={{
                                width: "100%",
                                padding: 1,
                                marginBottom: 1,
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 2,
                            }}
                        >
                            <Box sx={{ minWidth: 48 }}>
                                <CustomAvatar name={`${comment.user.firstName} ${comment.user.lastName}`} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <strong>{`${comment.user.firstName} ${comment.user.lastName}`}</strong>
                                    <span style={{ marginLeft: 8, color: "#555" }}>@{comment.user.username}</span>
                                    <span style={{ marginLeft: 16, color: "#888", fontSize: 12 }}>
                                        {relativeTimeConversion(comment.createdAt)}
                                    </span>
                                </Box>
                                <Box sx={{ mt: 1, textAlign: "start" }}>
                                    <p style={{ margin: 0 }}>{comment.content}</p>
                                </Box>
                            </Box>
                        </Box>
                        <Divider sx={{ width: "100%", bgcolor: grey[200] }} />
                    </>
                ))
            ) : (
                <Paper
                    sx={{
                        width: "100%",
                        padding: 1,
                        borderRadius: 2,
                        boxShadow: 1,
                        textAlign: "center"
                    }}
                >
                    No hay comentarios todavía.
                </Paper>
            )}
        </Paper>
    );
}

export default Comments;