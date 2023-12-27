import { createSlice } from "@reduxjs/toolkit";

const meSlice = createSlice({
  name: "myData",
  initialState: {
    data: null,
    loading: true,
    error: null,
    channelId: "",
    messageReceiverId: "",
    lastMessageIndex: 0,
    messageReceiverUsername: "",
    messageReceiverFirstName: "",
    messageReceiverLastName: "",
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
    setMessageReceiverUsername: (state, action) => {
      state.messageReceiverUsername = action.payload;
    },
    setMessageReceiverFirstName: (state, action) => {
      state.messageReceiverFirstName = action.payload;
    },
    setMessageReceiverLastName: (state, action) => {
      state.messageReceiverLastName = action.payload;
    },
    setLastMessageIndex: (state, action) => {
      state.lastMessageIndex = action.payload;
    },
  },
});
export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserError,
  setMySelectedChannel,
  setMessageReceiverId,
  setLastMessageIndex,
  setMessageReceiverFirstName,
  setMessageReceiverLastName,
  setMessageReceiverUsername
} = meSlice.actions;
export default meSlice.reducer;
