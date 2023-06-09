import { SupaClient } from "@/utils/supabase";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchIntialPosts = createAsyncThunk<
  any,
  void,
  {
    rejectValue: any;
  }
>(
  "/post/fetchIntialPosts",
  async (_payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await SupaClient.from("SavedPost")
        .select("*,User(name)")
        .order("createdAt", { ascending: false }).limit(10);
      const data = response.data;
      console.log(response.error)
      return fulfillWithValue(data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const PostAdapter = createEntityAdapter<any>({
  selectId: (post) => post.id,
});

export const PostSlice = createSlice({
  name: "post",
  reducers: {},
  initialState: PostAdapter.getInitialState<{ isLoading: boolean }>({
    isLoading: false,
  }),
  extraReducers(builder) {
    builder
      .addCase(fetchIntialPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchIntialPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload)
        action.payload && PostAdapter.addMany(state, action.payload);
      });
  },
});

export const PostSelector = PostAdapter.getSelectors();
