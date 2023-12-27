import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import Layout from "../layout/Layout";
import Image from "next/image";
import NextLink from "next/link";

interface IndexViewProps {

}

const IndexView: React.FC<IndexViewProps> = ({ }) => {
  const theme = useTheme();
  const text = "Sign into Paurush's Slack Application";
  return (
    <Layout>
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: theme.palette.background.paper,
          flexDirection: "column",
        }}
      >
        <Box
          width="50vw"
          height="50vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius={10}
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
          role="main" // Accessibility improvement
        >
          <Stack spacing={5} m={2} alignItems="center">
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
                    backgroundColor: theme.palette.primary["200"],
                  },
                }}
              >
                {text}
              </Button>
            </NextLink>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
};
export default IndexView;
