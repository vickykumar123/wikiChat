import { configureStore } from "@reduxjs/toolkit";
import loading from "@/redux/stateSlice";

export const store = configureStore({
  reducer: { loading },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
