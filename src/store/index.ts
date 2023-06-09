import { configureStore } from "@reduxjs/toolkit";
import { PostSlice } from "./post.slice";

export const store = configureStore({
  reducer: {
    [PostSlice.name]:PostSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
