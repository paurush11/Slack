import { createSlice } from "@reduxjs/toolkit";

const meSlice = createSlice({
    name: "myData",
    initialState: {
        data: null,
        loading: true,
        error: null,
    },
    reducers: {
        fetchUserStart: (state) => {
            state.loading = true;
        },
        fetchUserSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchUserError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserError } =
    meSlice.actions;
export default meSlice.reducer;
