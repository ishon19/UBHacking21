import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import MenuIcon from "@mui/icons-material/Menu"
import React from "react";

const Header = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>            
          <Typography variant="h6">
            Frontline Aid
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;