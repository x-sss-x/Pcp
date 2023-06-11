import { SupaClient } from "@/utils/supabase";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from ".";

export const postLike = createAsyncThunk<
  any,
  {
    userId: string;
    postId: string;
  },
  {
    rejectValue: any;
  }
>(
  "/like/postLike",
  async (
    payload,
    { fulfillWithValue, rejectWithValue, dispatch, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const getList = LikeSelector.selectById(state, payload.postId);
      const isLikedAlready = getList?.idList.includes(payload.userId);

      if (isLikedAlready) {
        await SupaClient.from("Like")
          .delete()
          .eq("userId", payload.userId)
          .eq("postId", payload.postId);
        dispatch(
          updateOneLike({
            postId: payload.postId,
            idList:
              getList?.idList &&
              getList.idList.filter((userId) => userId !== payload.userId),
          })
        );
      } else {
        await SupaClient.from("Like").insert({
          postId: payload.postId,
          userId: payload.userId,
        });
        dispatch(
          updateOneLike({
            postId: payload.postId,
            idList: getList?.idList
              ? [...getList.idList, payload.userId]
              : [payload.userId],
          })
        );
      }
      return fulfillWithValue(true);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchLike = createAsyncThunk<
  any,
  {
    postId: string;
  },
  {
    rejectValue: any;
  }
>(
  "/like/fetchLike",
  async (payload, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await SupaClient.from("Like")
        .select("userId")
        .eq("postId", payload.postId)
        .limit(10);
      console.log(payload);
      const data = {
        postId: payload.postId,
        idList: response.data?.map((likee) => likee.userId) ?? [],
      };
      dispatch(updateOneLike(data));
      return fulfillWithValue(data);
    } catch (e: any) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  }
);

export type LikeProps = {
  postId: string;
  idList: string[];
};

const LikeAdapter = createEntityAdapter<LikeProps>({
  selectId: (post) => post.postId,
});

export const LikeSlice = createSlice({
  name: "like",
  reducers: {
    setOneLike: LikeAdapter.setOne,
    updateOneLike(state, action) {
      return LikeAdapter.upsertOne(state, {
        postId: action.payload.postId,
        idList: [...action.payload.idList],
      });
    },
    removeOneLike(state, action) {
      const doneLike = [
        ...state.entities[action.payload.postId]!.idList.filter(
          (likee) => likee !== action.payload.userId
        ),
      ];
      return LikeAdapter.updateOne(state, {
        id: action.payload.postId,
        changes: { idList: doneLike },
      });
    },
  },
  initialState: LikeAdapter.getInitialState<{ isLoading: boolean }>({
    isLoading: false,
  }),
  extraReducers(builder) {},
});

export const { updateOneLike, removeOneLike } = LikeSlice.actions;
export const LikeSelector = LikeAdapter.getSelectors<RootState>(
  (state) => state.like
);
