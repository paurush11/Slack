import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Badge, Box, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import React from "react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import MailIcon from '@mui/icons-material/Mail';
interface NavbarProps {
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleTheme }) => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            SLACK
          </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ThemeToggleButton
          toggleTheme={toggleTheme}
          themeMode={theme.palette.mode}
          />
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
      </Toolbar>
    </AppBar>
  );
};
