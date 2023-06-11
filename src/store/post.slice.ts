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
  reducers: {
    addOneLike(state, action) {
      const doneLike = [
        ...state.entities[action.payload.postId]!.Like,
        action.payload.userId,
      ];
      return PostAdapter.updateOne(state, {
        id: action.payload.postId,
        changes: { Like: doneLike },
      });
    },
    removeOneLike(state, action) {
      const doneLike = [
        ...state.entities[action.payload.postId]!.Like.filter(
          (likee) => likee !== action.payload.userId
        ),
      ];
      return PostAdapter.updateOne(state, {
        id: action.payload.postId,
        changes: { Like: doneLike },
      });
    },
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

export const { addOneLike, removeOneLike } = PostSlice.actions;
