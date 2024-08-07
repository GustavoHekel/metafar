import {FC} from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

const Header: FC = () => {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color={'secondary'}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Welcome to Metafar challenge
                </Typography>
            </Toolbar>
        </AppBar>
    </Box>
    )
}

export default Header