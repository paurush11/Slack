import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import NextLink from "next/link";
import Image from "next/image";

interface IndexProps {
  toggleTheme: () => void;
}

const Index: React.FC<IndexProps> = ({ toggleTheme }) => {
  const theme = useTheme();
  const text = "Sign into Paurush's Slack Application";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
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
          <Box justifyContent="flex-end">
            <ThemeToggleButton
              toggleTheme={toggleTheme}
              themeMode={theme.palette.mode}
            />
          </Box>
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
  );
};

export default Index;
