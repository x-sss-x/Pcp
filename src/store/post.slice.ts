import { SupaClient } from "@/utils/supabase";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { Database } from "../../types/supabase";

export const fetchIntialPosts = createAsyncThunk<
  any,
  void,
  {
    rejectValue: any;
  }
>(
  "/post/fetchIntialPosts",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await SupaClient.from("Post")
        .select("*,User(name,username,image),Like(userId)")
        .order("createdAt", { ascending: false })
        .limit(10);
      console.log(payload);
      const data = response.data?.map((post) => ({
        ...post,
        Like: post.Like.map((likee) => likee.userId),
      }));
      console.log(response.error);
      return fulfillWithValue(data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export type PostProps = Database["public"]["Tables"]["Post"]["Row"] & {
  User: Pick<
    Database["public"]["Tables"]["User"]["Row"],
    "username" | "image" | "name"
  >;
};

const PostAdapter = createEntityAdapter<PostProps>({
  selectId: (post) => post.id,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

export const PostSlice = createSlice({
  name: "post",
  reducers: {
    addOnePost: PostAdapter.upsertOne,
  },
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

export const PostSelector = PostAdapter.getSelectors<RootState>(
  (state) => state.post
);

export const { addOnePost } = PostSlice.actions;
