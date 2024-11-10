import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Appbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = (
        <List>
            <ListItem button>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Consult Doctor" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Medical History" />
            </ListItem>
            <ListItem button>
                <ListItemText primary="Medical Resources" />
            </ListItem>
            <Divider />
            <ListItem button>
                <ListItemText primary="Logout" />
            </ListItem>
        </List>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ bgcolor: '#F7F9F2' }} color="default" position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        E-Hospitality
                    </Typography>

                    {!isMobile && (
                        <>
                            <Button color="inherit">Home</Button>
                            <Button color="inherit">Consult Doctor</Button>
                            <Button color="inherit">Medical History</Button>
                            <Button color="inherit">Medical Resources</Button>
                            <Button color="inherit">Logout</Button>
                        </>
                    )}

                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                    >
                        {menuItems}
                    </Drawer>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
