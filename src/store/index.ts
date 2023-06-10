import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { PostSlice } from "./post.slice";
import { UserSlice } from "./user.slice";
import {createWrapper} from "next-redux-wrapper"


export const store = configureStore({
  reducer: {
    [PostSlice.name]:PostSlice.reducer,
    [UserSlice.name]:UserSlice.reducer,
  },
});

export type AppStore =  typeof store
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
