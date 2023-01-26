import { Box } from "@mui/material";

export const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box
            width={size}
            height={size}
        >
            <img
                style={{ objectFilt: "cover", borderRadius: "50%" }}
                alt='user'
                height={size}
                width={size}
                src={`https://sociomedia-app.onrender.com/assets/${image}`}
            />
        </Box>
    );
};