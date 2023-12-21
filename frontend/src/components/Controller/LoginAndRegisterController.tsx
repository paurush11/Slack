import { Box, Stack, Button } from "@mui/material";
import React from "react";
import Layout from "../layout/Layout";
import { LoginController } from "./LoginController";
import { SignUpController } from "./SignUpController";

interface LoginAndRegisterControllerProps {}

export const LoginAndRegisterController: React.FC<
  LoginAndRegisterControllerProps
> = ({}) => {
  return (
    <Layout toggleTheme={toggleTheme}>
      <Box
        flexGrow={1}
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
          {selectedState === 1 ? <SignUpController /> : <LoginController />}
        </Box>
      </Box>
    </Layout>
  );
};
