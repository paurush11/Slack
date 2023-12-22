import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import MailIcon from "@mui/icons-material/Mail";
import { NavbarProps } from "@/interfaces/allProps";
import LogoutIcon from '@mui/icons-material/Logout';

export const Navbar: React.FC<NavbarProps> = ({ toggleTheme, data }) => {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        zIndex: 1,
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
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          SLACK
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ThemeToggleButton
          toggleTheme={toggleTheme}
          themeMode={theme.palette.mode}
        />
        {data && (
          <IconButton
            size="large"
            aria-label="show new messages"
            color="inherit"
          >
            <Badge
              badgeContent={data.Me?.messagesReceived?.length}
              color="error"
            >
              <MailIcon />
            </Badge>
          </IconButton>
        )}
        {data && (
          <IconButton
            size="large"
            aria-label="logout"
            color="inherit"
          >
            <LogoutIcon />

          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};
