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
        .select("*,User(name,username,image),LikeDetails(count),Like(userId)")
        .order("createdAt", { ascending: false })
        .limit(10);
      const data = response.data?.map((post) => ({
        ...post,
        Like: post.Like.map((Likee) => Likee.userId),
      }));
      console.log(response.error);
      return fulfillWithValue(data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export type PostProps = Database["public"]["Tables"]["Post"]["Row"] & {
  User: Database["public"]["Tables"]["User"]["Row"];
  LikeDetails: { count: number }[];
  isLiked?: boolean;
  Like: string[];
};

const PostAdapter = createEntityAdapter<PostProps>({
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

export const PostSelector = PostAdapter.getSelectors<RootState>(
  (state) => state.post
);
