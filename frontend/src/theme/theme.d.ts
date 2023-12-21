// theme.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    primary: PaletteColor & CustomPaletteColor;
    secondary: PaletteColor & CustomPaletteColor;
  }
  interface PaletteColor {
    main: string;
    light: string; // Muted Purple
    dark: string; // Very Dark Purple
    contrastText: string;
    "100"?: string;
    "200"?: string;
    "300"?: string;
    "400"?: string;
    "500"?: string;
    "600"?: string;
    "700"?: string;
    "800"?: string;
    "900"?: string;
    // ... other custom color shades
  }
  interface PaletteColorOptions {
    main: string;
    light: string; // Muted Purple
    dark: string; // Very Dark Purple
    contrastText: string;
    "100"?: string;
    "200"?: string;
    "300"?: string;
    "400"?: string;
    "500"?: string;
    "600"?: string;
    "700"?: string;
    "800"?: string;
    "900"?: string;
    // ... other custom color shades
  }
  interface PaletteOptions {
    primary?: PaletteColorOptions & CustomPaletteColorOptions;
    secondary?: PaletteColorOptions & CustomPaletteColorOptions;
  }
}
