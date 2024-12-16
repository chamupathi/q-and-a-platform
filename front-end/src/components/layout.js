import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material';
import AuthButton from './auth-button';

const Layout = ({ children }) => {
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Header Section */}
            <AppBar position="fixed">
                <Toolbar>
                    {/* Home Icon */}
                    <IconButton edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }}>
                        <HomeIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Answer Mate
                    </Typography>

                    {/* Profile Icon */}
                    <IconButton color="inherit" aria-label="profile" sx={{ mr: 2 }}>
                        <AccountCircle />
                    </IconButton>


                    <AuthButton />
                </Toolbar>
            </AppBar>

            {/* To componsate for the app bar height */}
            <Toolbar />


            <Box sx={{ height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - ${theme.spacing(1)})`, }}>
                {children}
            </Box>
        </Box>
    );
}

export default Layout;
