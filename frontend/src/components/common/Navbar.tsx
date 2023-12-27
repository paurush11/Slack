import MenuIcon from "@mui/icons-material/Menu";
import {
  Alert,
  AppBar,
  Badge,
  Box,
  IconButton,
  Snackbar,
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
import { LogoutDocument, MeQuery } from "@/generated/output/graphql";
import router from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSuccess } from "@/store/meSlice";
import { toggleTheme } from "@/store/themeSlice";
import { toggleLayout } from "@/store/smallLayoutSlice";

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const theme = useTheme();
  const [Logout, { error, loading }] = useMutation(LogoutDocument);
  const userData: MeQuery | null = useSelector(
    (state: RootState) => state.myData.data,
  );
  const dispatch = useDispatch();
  const [logoutError, setLogoutError] = useState<ApolloError>();
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const onClickLogout = async () => {
    const response = await Logout();
    if (response.data?.Logout) {
      router.replace("/");
      dispatch(fetchUserSuccess(null));
    } else if (error) {
      setLogoutError(error);
      setOpenErrorSnackbar(true);
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
          sx={{ ml: 1, mr: 3 }}
          onClick={() => dispatch(toggleLayout())}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h1"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          SLACK
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ThemeToggleButton
          toggleTheme={() => {
            dispatch(toggleTheme());
          }}
          themeMode={theme.palette.mode}
        />
        {loading && <CircularProgress color="secondary" />}
        {userData && (userData as MeQuery)?.Me && (
          <IconButton
            size="large"
            aria-label="show new messages"
            color="inherit"
          >
            <Badge
              badgeContent={
                (userData as MeQuery)?.Me?.user?.messagesReceived?.length
              }
              color="error"
            >
              <MailIcon />
            </Badge>
          </IconButton>
        )}
        {userData && (userData as MeQuery)?.Me && (
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
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error">
          {logoutError?.message}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};
