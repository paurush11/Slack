import { IconButton } from "@mui/material";
import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";

interface ThemeToggleButtonProps {
  themeMode: string;
  toggleTheme: () => void;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  themeMode,
  toggleTheme,
}) => {
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {themeMode === "light" ? <DarkModeIcon /> : <LightModeTwoToneIcon />}
    </IconButton>
  );
};
