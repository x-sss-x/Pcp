import { configureStore } from "@reduxjs/toolkit";
import { PostSlice } from "./post.slice";
import { UserSlice } from "./user.slice";
import { LikeSlice } from "./like.slice";


export const store = configureStore({
  reducer: {
    [PostSlice.name]:PostSlice.reducer,
    [UserSlice.name]:UserSlice.reducer,
    [LikeSlice.name]:LikeSlice.reducer,
  },
});

export type AppStore =  typeof store
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
