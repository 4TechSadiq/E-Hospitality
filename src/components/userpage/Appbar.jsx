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
import { Navigate } from 'react-router-dom';

const Appbar = ({ onSelectSection }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false); // Track logout state
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleMenuClick = (section) => {
        if (section === 'Logout') {
            setIsLoggedOut(true); // Set the logout state to true
        } else {
            onSelectSection(section);  // Update the active section
            setDrawerOpen(false);      // Close the drawer on mobile after selection
        }
    };

    if (isLoggedOut) {
        return <Navigate to="/" />; // Redirect to the login page when logged out
    }

    const menuItems = (
        <List>
            <ListItem button onClick={() => handleMenuClick('UserPage')}>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('Consult')}>
                <ListItemText primary="Consult Doctor" />
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('MedicalHistory')}>
                <ListItemText primary="Medical History" />
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('Resources')}>
                <ListItemText primary="Medical Resources" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => handleMenuClick('Logout')}>
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
                            <Button color="inherit" onClick={() => handleMenuClick('UserPage')}>Home</Button>
                            <Button color="inherit" onClick={() => handleMenuClick('Consult')}>Consult Doctor</Button>
                            <Button color="inherit" onClick={() => handleMenuClick('MedicalHistory')}>Medical History</Button>
                            <Button color="inherit" onClick={() => handleMenuClick('Resources')}>Medical Resources</Button>
                            <Button color="inherit" onClick={() => handleMenuClick('Logout')}>Logout</Button> 
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
};

export default Appbar;
