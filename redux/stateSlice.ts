import { createSlice } from "@reduxjs/toolkit";

interface Loading {
  isLoading: boolean;
}

const initialState: Loading = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    finishLoading(state) {
      state.isLoading = false;
    },
  },
});

export const { startLoading, finishLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
