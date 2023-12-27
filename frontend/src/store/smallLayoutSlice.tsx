import { createSlice } from "@reduxjs/toolkit";
const getInitialState = () => {
  if (typeof window !== "undefined") {
    const savedData = sessionStorage.getItem("smallLayout");
    console.log("HIHI")
    console.log(savedData)
    return savedData ? JSON.parse(savedData) : true;
  }
  return true; // Return a default state if on the server side
};
const setSmallLayout = () => {
  if (typeof window !== "undefined") {
    const savedData = sessionStorage.getItem("smallLayout");
    if (savedData) {
      sessionStorage.setItem("smallLayout", JSON.stringify(!savedData));
    }
  }
};
const smallLayoutSlice = createSlice({
  name: "smallLayout",
  initialState: {
    smallLayout: true,
  },
  reducers: {
    toggleLayout: (state) => {
      state.smallLayout = !state.smallLayout;

    },
  },
});

export const { toggleLayout } = smallLayoutSlice.actions;
export default smallLayoutSlice.reducer;
