import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Appbar() {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{bgcolor: '#F7F9F2'}} color="black" position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                <MenuIcon>
                </MenuIcon>
                </IconButton>
                <Typography className="ms-4" variant="subtitle2">
                    Home
                </Typography>
                <Typography className="ms-4" variant="subtitle2">
                    Consult Doctor
                </Typography>
                <Typography className="ms-4" variant="subtitle2">
                    Medical History
                </Typography>
                <Typography className="ms-4" variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
                    Medical resources
                </Typography>
                <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}