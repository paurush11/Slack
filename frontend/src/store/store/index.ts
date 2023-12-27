import { configureStore } from "@reduxjs/toolkit";
import channelSlice from "../channelSlice";
import myMessagesInChannelSlice from "../myMessagesInChannelSlice";
import meSlice from "../meSlice";
import { combineReducers } from "redux";
import themeSlice from "../themeSlice";
import smallLayoutSlice from "../smallLayoutSlice";
import sideLayoutDataSlice from "../sideLayoutDataSlice";

const rootReducer = combineReducers({
  myChannelData: channelSlice,
  myData: meSlice,
  myThemes: themeSlice,
  smallLayout: smallLayoutSlice,
  myMessages: myMessagesInChannelSlice,
  sideLayoutData: sideLayoutDataSlice,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
