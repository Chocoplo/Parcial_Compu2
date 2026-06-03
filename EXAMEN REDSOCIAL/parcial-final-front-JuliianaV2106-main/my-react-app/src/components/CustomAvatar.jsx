import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

function CustomAvatar({name}) {
    const initials = name
        ? name
            .split(" ")
            .slice(0, 2)
            .map(word => word[0])
            .join("")
            .toUpperCase()
        : "";

    return (
        <Avatar sx={{ bgcolor: deepPurple[500], mx: 2 }}>{initials}</Avatar>
    );
}

export default CustomAvatar;