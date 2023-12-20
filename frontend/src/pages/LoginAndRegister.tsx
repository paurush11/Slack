import { LoginForm } from "@/components/common/LoginForm";
import { SignUpForm } from "@/components/common/SignUpForm";
import { Box, Button, Grid, Stack, useTheme } from "@mui/material";
import React, { useState } from "react";

interface LoginAndRegisterProps {}

const LoginAndRegister: React.FC<LoginAndRegisterProps> = ({}) => {
  const theme = useTheme();
  const [selectedState, setSelectedState] = useState(1);
  return (
    <Box
      height={"100vh"}
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100vw"}
      display={"flex"}
    >
      <Box
        width={"60%"}
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignSelf={"center"}
          p={2}
          spacing={1}
        >
          <Button
            fullWidth
            onClick={() => setSelectedState(1)}
            sx={{
              color: theme.palette.primary.contrastText,
              backgroundColor:
                selectedState === 1
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            onClick={() => setSelectedState(2)}
            sx={{
              color: theme.palette.primary.contrastText,
              backgroundColor:
                selectedState === 2
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            Login
          </Button>
        </Stack>
        {selectedState === 1 ? <SignUpForm /> : <LoginForm />}
      </Box>
    </Box>
  );
};

export default LoginAndRegister;
