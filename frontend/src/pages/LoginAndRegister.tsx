import { LoginForm } from "@/components/common/LoginForm";
import { Box, Button, Grid, Stack, useTheme } from "@mui/material";
import React from "react";

interface LoginAndRegisterProps {}

const LoginAndRegister: React.FC<LoginAndRegisterProps> = ({}) => {
  const theme = useTheme();
  return (
    <Box
      height={"100vh"}
      bgcolor={`${theme.palette.background.default}`}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      display={"flex"}
    >
      <Grid
        container
        spacing={4}
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
      >
        <Grid item xs={6}>
          <LoginForm />
        </Grid>
        <Grid item xs={6}>
          Register
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginAndRegister;
