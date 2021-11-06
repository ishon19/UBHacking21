import { AppBar, IconButton, Toolbar, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

const Header = () => {
  return (
    <Box sx={{flexGrow: 1}} justifyContent="space-between">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ color: "whitesmoke" }} />
          </IconButton>
          <Typography variant="h5" sx={{ color: "whitesmoke" }}>
            Frontline Aid
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button sx={{color: 'white'}}>
              <Typography variant="h6">Login</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
