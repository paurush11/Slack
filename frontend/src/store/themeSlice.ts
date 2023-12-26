import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "themeData",
    initialState: {
        theme: "light"
    },
    reducers: {
        toggleTheme: (state) => {
            if (state.theme === "light") {
                state.theme = "dark"
            } else {
                state.theme = "light"
            }
        }
    },
});

export const { toggleTheme } =
    themeSlice.actions;
export default themeSlice.reducer;
