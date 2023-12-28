import { LoginController } from "@/components/Controller/LoginController";
import { SignUpController } from "@/components/Controller/SignUpController";
import Layout from "@/components/layout/Layout";
import { LoginAndRegisterProps } from "@/interfaces/allProps";
import { Box, Button, Stack, useTheme } from "@mui/material";
import React, { useState } from "react";

const LoginAndRegister: React.FC<LoginAndRegisterProps> = ({ }) => {
  const theme = useTheme();
  const [selectedState, setSelectedState] = useState(1);
  return (
    <Layout >
      <Box
        flexGrow={1}
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100vw"}
        display={"flex"}
      >
        <Box
          width={"60%"}
          borderRadius={10}
          p={2}
          sx={{
            backgroundColor: theme.palette.background.default,
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
                  backgroundColor: theme.palette.primary["200"],
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
                  backgroundColor: theme.palette.primary["200"],
                },
              }}
            >
              Login
            </Button>
          </Stack>
          {selectedState === 1 ? <SignUpController /> : <LoginController />}
        </Box>
      </Box>
    </Layout>
  );
};

export default LoginAndRegister;
