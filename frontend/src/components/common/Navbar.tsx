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
import React, { useState } from "react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import MailIcon from "@mui/icons-material/Mail";
import { NavbarProps } from "@/interfaces/allProps";
import LogoutIcon from "@mui/icons-material/Logout";
import { ApolloError, useMutation } from "@apollo/client";
import { LogoutDocument } from "@/generated/output/graphql";
import router from "next/router";

export const Navbar: React.FC<NavbarProps> = ({
  toggleTheme,
  data: meData,
}) => {
  const theme = useTheme();
  const [Logout, { data, error, loading }] = useMutation(LogoutDocument);
  const [logoutError, setLogoutError] = useState<ApolloError>();
  const onClickLogout = async () => {
    const response = await Logout();
    if (response.data?.Logout) {
      router.replace("/");
    } else if (error) {
      setLogoutError(error);
    }
  };
  return (
    <AppBar
      position="relative"
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
        {meData?.Me && (
          <IconButton
            size="large"
            aria-label="show new messages"
            color="inherit"
          >
            <Badge
              badgeContent={meData?.Me?.messagesReceived?.length}
              color="error"
            >
              <MailIcon />
            </Badge>
          </IconButton>
        )}
        {meData?.Me && (
          <IconButton
            size="large"
            aria-label="logout"
            color="inherit"
            onClick={onClickLogout}
          >
            <LogoutIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};
