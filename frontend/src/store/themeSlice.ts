import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const savedData = sessionStorage.getItem("theme");
    return savedData ? savedData : null;
  }
  return null; // Return a default state if on the server side
};
const setTheme = (theme: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("theme", theme);
  }
};

const themeSlice = createSlice({
  name: "themeData",
  initialState: {
    theme: getInitialState(),
  },
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === "light") {
        state.theme = "dark";
        setTheme("dark");
      } else {
        state.theme = "light";
        setTheme("light");
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
