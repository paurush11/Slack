import { createSlice } from "@reduxjs/toolkit";

const smallLayoutSlice = createSlice({
    name: "smallLayout",
    initialState: {
        smallLayout: true
    },
    reducers: {
        toggleLayout: (state) => {
            state.smallLayout = !state.smallLayout
        }
    },
});

export const { toggleLayout } =
smallLayoutSlice.actions;
export default smallLayoutSlice.reducer;
