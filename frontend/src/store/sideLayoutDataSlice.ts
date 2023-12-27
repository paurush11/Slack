import { createSlice } from "@reduxjs/toolkit";

const sideLayoutDataSlice = createSlice({
  name: "sideLayoutData",
  initialState: {
    sideLayoutData: null,
  },
  reducers: {
    setsideLayoutData: (state, action) => {
      state.sideLayoutData = action.payload;
    },
  },
});

export const { setsideLayoutData } = sideLayoutDataSlice.actions;
export default sideLayoutDataSlice.reducer;
