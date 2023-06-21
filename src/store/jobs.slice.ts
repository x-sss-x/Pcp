import { SupaClient } from "@/utils/supabase";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { Database } from "../../types/supabase";

export const fetchIntialJobs = createAsyncThunk<
  any,
  void,
  {
    rejectValue: any;
  }
>(
  "/jobs/fetchIntialJobs",
  async (_payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await SupaClient.from("Jobs")
        .select("*,User(name,username,image,email)")
        .order("createdAt", { ascending: false })
        .limit(10);
      const data = response.data;
      return fulfillWithValue(data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchMyJobs = createAsyncThunk<
  any,
  string,
  {
    rejectValue: any;
  }
>(
  "/jobs/fetchMyJobs",
  async (_payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await SupaClient.from("Jobs")
        .select("*,User(name,username,image,email)")
        .eq("userId", _payload)
        .order("createdAt", { ascending: false })
        .limit(10);
      const data = response.data;
      return fulfillWithValue(data);
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export type JobsProps = Database["public"]["Tables"]["Jobs"]["Row"] & {
  User: Pick<
    Database["public"]["Tables"]["User"]["Row"],
    "username" | "image" | "name" | "email"
  >;
};

const JobsAdapter = createEntityAdapter<JobsProps>({
  selectId: (job) => job.id,
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

export const JobsSlice = createSlice({
  name: "jobs",
  reducers: {},
  initialState: JobsAdapter.getInitialState<{ isLoading: boolean }>({
    isLoading: false,
  }),
  extraReducers(builder) {
    builder
      .addCase(fetchIntialJobs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchIntialJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        action.payload && JobsAdapter.addMany(state, action.payload);
      })
      .addCase(fetchMyJobs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchMyJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        action.payload && JobsAdapter.addMany(state, action.payload);
      });
  },
});

export const JobsSelector = JobsAdapter.getSelectors<RootState>(
  (state) => state.jobs
);
