import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#192a51", // Dark Blue
      light: "#967aa1", // Light Purple
      dark: "#3f0e41", // Darker Purple
      contrastText: "#fff",
    },
    secondary: {
      main: "#d5c6e0", // Soft Lavender
      light: "#f5e6e8", // Very Pale Pink
      dark: "#967aa1", // Darker Purple
      contrastText: "#fff",
    },
    error: {
      main: "#e57373", // Soft Red
      light: "#ffa4a2", // Lighter Red
      dark: "#af4448", // Darker Red
      contrastText: "#fff",
    },
    background: {
      // default: "#f5e6e8", // Very Pale Pink
      default: "#f9f9f8",
      paper: "#ffffff", // White
    },
    // ... other light theme customizations
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: "2.5rem",
    },
    h2: {
      fontSize: "2rem",
    },
    // ... other typography settings
  },
  spacing: 8, // The base unit of spacing. Defaults to 8px
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // ...other theme customizations
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2c387e", // Darker Blue
      light: "#5f5c7d", // Muted Purple
      dark: "#2d283e", // Very Dark Purple
      contrastText: "#fff",
    },
    secondary: {
      main: "#796a93", // Muted Lavender
      light: "#a094b7", // Light Muted Purple
      dark: "#4b384c", // Dark Muted Purple
      contrastText: "#fff",
    },
    error: {
      main: "#d32f2f", // Brighter Red
      light: "#ef5350", // Light Red
      dark: "#c62828", // Dark Red
      contrastText: "#fff",
    },
    background: {
      default: "#424242", // Dark Grey
      paper: "#303030", // Darker Grey
    },
    // ... other dark theme customizations
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: "2.5rem",
    },
    h2: {
      fontSize: "2rem",
    },
    // ... other typography settings
  },
  spacing: 8, // The base unit of spacing. Defaults to 8px
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // ...other theme customizations
});

export { lightTheme, darkTheme };
