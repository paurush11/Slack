import store, { RootState } from "@/store/store";
import { darkTheme, lightTheme } from "@/styles/theme";
import { createMyClient } from "@/utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";

interface WrappedAppProps {
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
}
function WrappedApp({ Component, pageProps }: WrappedAppProps) {
  const themeMode = useSelector((state: RootState) => state.myThemes.theme)
  const theme = themeMode === 'light' ? lightTheme : darkTheme;
  const createApolloClient = createMyClient();
  return (
    <ApolloProvider client={createApolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalize CSS */}
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WrappedApp pageProps={pageProps} Component={Component} />
    </Provider >
  );
}

export default MyApp;
