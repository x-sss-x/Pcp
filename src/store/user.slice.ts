import { createSlice } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import { HYDRATE } from "next-redux-wrapper";

type User = Session["user"] | null;

const initialState: User = null;

export const UserSlice = createSlice({
  name: "user",
  reducers: {
    setUser(state, action) {
      state = action.payload;
    },
  },
  initialState,
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        //@ts-ignore
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUser } = UserSlice.actions;
