import { createSlice } from "@reduxjs/toolkit";

const myMessagesInChannelSlice = createSlice({
  name: "myMessagesInChannel",
  initialState: {
    data: null,
    loading: true,
    error: null,
  },
  reducers: {
    fetchMyMessagesInChannel: (state) => {
      state.loading = true;
    },
    fetchMyMessagesInChannelSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchMyMessagesInChannelError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMyMessagesInChannelSuccess,
  fetchMyMessagesInChannelError,
  fetchMyMessagesInChannel,
} = myMessagesInChannelSlice.actions;
export default myMessagesInChannelSlice.reducer;
