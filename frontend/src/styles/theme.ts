import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#192a51", // Dark Blue
      light: "#967aa1", // Light Purple
      dark: "#3f0e41", // Darker Purple
      contrastText: "#fff",
      "100": "#001219", // Darkest Blue
      "200": "#005f73", // Dark Cyan
      "300": "#0a9396", // Persian Green
      "400": "#94d2bd", // Middle Blue Green
      "500": "#e9d8a6", // Pale Spring Bud
      "600": "#ee9b00", // Selective Yellow
      "700": "#ca6702", // Windsor Tan
      "800": "#bb3e03", // Dark Orange
      "900": "#ae2012",
    },
    secondary: {
      main: "#d5c6e0", // Soft Lavender
      light: "#f5e6e8", // Very Pale Pink
      dark: "#967aa1", // Darker Purple
      contrastText: "#fff",
      "100": "#d8f3dc",
      "200": "#b7e4c7",
      "300": "#95d5b2",
      "400": "#74c69d",
      "500": "#52b788",
      "600": "#40916c",
      "700": "#2d6a4f",
      "800": "#1b4332",
      "900": "#081c15",
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
      "100": "#ae2012", // Since '100' should be lighter in the dark theme, use a lighter color
      "200": "#bb3e03",
      "300": "#ca6702",
      "400": "#ee9b00",
      "500": "#e9d8a6",
      "600": "#94d2bd",
      "700": "#0a9396",
      "800": "#005f73",
      "900": "#001219",
    },
    secondary: {
      main: "#796a93", // Muted Lavender
      light: "#a094b7", // Light Muted Purple
      dark: "#4b384c", // Dark Muted Purple
      contrastText: "#fff",
      "100": "#081c15", // Since '100' should be lighter in the dark theme, use a lighter color
      "200": "#1b4332",
      "300": "#2d6a4f",
      "400": "#40916c",
      "500": "#52b788",
      "600": "#74c69d",
      "700": "#95d5b2",
      "800": "#b7e4c7",
      "900": "#d8f3dc",
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
