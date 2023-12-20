import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const theme = useTheme();
  return (
    <Box height={"100vh"} bgcolor={`${theme.palette.background.paper}`}>
      <Grid
        container
        spacing={4}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={8}>
          Login
        </Grid>
        <Grid item xs={8}>
          Register
        </Grid>
      </Grid>
    </Box>
  );
};
export default Login;
