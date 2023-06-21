import { configureStore } from "@reduxjs/toolkit";
import { PostSlice } from "./post.slice";
import { UserSlice } from "./user.slice";
import { LikeSlice } from "./like.slice";
import { JobsSlice } from "./jobs.slice";


export const store = configureStore({
  reducer: {
    [PostSlice.name]:PostSlice.reducer,
    [UserSlice.name]:UserSlice.reducer,
    [LikeSlice.name]:LikeSlice.reducer,
    [JobsSlice.name]:JobsSlice.reducer,
  },
});

export type AppStore =  typeof store
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
