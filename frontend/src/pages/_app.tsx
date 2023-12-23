import { darkTheme, lightTheme } from "@/styles/theme";
import { createClient } from "@/utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useState } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState("light");
  const theme = mode === "light" ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const createApolloClient = createClient();
  return (
    <ApolloProvider client={createApolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalize CSS */}
        <Component {...pageProps} toggleTheme={toggleTheme} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
