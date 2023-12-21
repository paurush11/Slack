import Layout from "@/components/layout/Layout";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

interface IndexProps {
  toggleTheme: () => void;
}

const Index: React.FC<IndexProps> = ({ toggleTheme }) => {
  const theme = useTheme();
  const text = "Sign into Paurush's Slack Application";
  console.log(toggleTheme);
  return (
    <Layout toggleTheme={toggleTheme}>
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: theme.palette.background.paper,
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          width="50vw"
          height="50vh"
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
          flexDirection="column"
          justifyContent="center"
          role="main" // Accessibility improvement
        >
          <Stack spacing={5} padding={2}>
            <Stack spacing={5} alignItems="center" justifySelf="center" m={2}>
              <Box maxWidth="100px">
                <Image
                  src="/logo.png"
                  alt="Logo for Slack application"
                  width={100}
                  height={100}
                />
              </Box>
              <Typography variant="h1" component="h1">
                Welcome to My Slack Application
              </Typography>
              <NextLink href="/LoginAndRegister" passHref>
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.dark,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                    },
                  }}
                >
                  {text}
                </Button>
              </NextLink>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
};

export default Index;
