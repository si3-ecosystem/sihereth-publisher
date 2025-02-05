import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  websiteData: null,
  isNewWebpage: true,
};

const contentReducer = createSlice({
  name: "content",
  initialState,
  reducers: {
    handleWebsiteData: (state, action) => {
      state.websiteData = action.payload;
    },
    handleNewWebpage: (state, action) => {
      state.isNewWebpage = action.payload;
    },
  },
});

export const { handleWebsiteData, handleNewWebpage } = contentReducer.actions;
export default contentReducer.reducer;
