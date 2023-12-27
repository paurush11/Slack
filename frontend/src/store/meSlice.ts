import { createSlice } from "@reduxjs/toolkit";

const meSlice = createSlice({
  name: "myData",
  initialState: {
    data: null,
    loading: true,
    error: null,
    channelId: "",
    messageReceiverId: "",
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
    setMySelectedChannel: (state, action) => {
      state.channelId = action.payload;
    },
    setMessageReceiverId: (state, action) => {
      state.messageReceiverId = action.payload;
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserError,
  setMySelectedChannel,
  setMessageReceiverId
} = meSlice.actions;
export default meSlice.reducer;