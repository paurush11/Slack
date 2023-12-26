import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "myChannelData",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchMyChannelData: (state) => {
      state.loading = true;
    },
    fetchMyChannelDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchMyChannelDataError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMyChannelData,
  fetchMyChannelDataSuccess,
  fetchMyChannelDataError,
} = channelSlice.actions;

export default channelSlice.reducer;
