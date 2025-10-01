import { createSlice, createAsyncThunk,type PayloadAction } from "@reduxjs/toolkit";
import API from "../../../api/axios";
import type { Subscription } from "../../types/subscription.types";

interface SubscriptionState {
  subscription: Subscription | null;
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscription: null,
  subscriptions: [],
  loading: false,
  error: null,
};

// Async Thunks

// Update a subscription by ID
export const updateSubscription = createAsyncThunk<
  Subscription, // Return type
  { id: string; data: Partial<Subscription> }, // Argument type
  { rejectValue: string }
>(
  "subscriptions/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await API.put<Subscription>(`/subscriptions/${id}`, data);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete a subscription by ID
export const deleteSubscription = createAsyncThunk<
  string, // Return just the deleted subscription ID
  string, // Arg = subscription ID
  { rejectValue: string }
>(
  "subscriptions/delete",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/subscriptions/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const fetchSubscriptions = createAsyncThunk<Subscription[], void, { rejectValue: string }>(
  "subscriptions/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await API.get<Subscription[]>("/subscriptions");
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchSubscriptionById = createAsyncThunk<Subscription, string, { rejectValue: string }>(
  "subscriptions/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await API.get<Subscription>(`/subscriptions/${id}`);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createSubscription = createAsyncThunk<Subscription, Subscription, { rejectValue: string }>(
  "subscriptions/create",
  async (data, thunkAPI) => {
    try {
      const response = await API.post<Subscription>("/subscriptions", data);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Slice

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action: PayloadAction<Subscription[]>) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // fetch one
      .addCase(fetchSubscriptionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionById.fulfilled, (state, action: PayloadAction<Subscription>) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(fetchSubscriptionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // create
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubscription.fulfilled, (state, action: PayloadAction<Subscription>) => {
        state.loading = false;
        state.subscriptions.push(action.payload);
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
            // updateSubscription
      .addCase(updateSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubscription.fulfilled, (state, action: PayloadAction<Subscription>) => {
        state.loading = false;
        const index = state.subscriptions.findIndex(sub => sub._id === action.payload._id);
        if (index !== -1) {
          state.subscriptions[index] = action.payload;
        }
        // If editing the active subscription
        if (state.subscription && state.subscription._id === action.payload._id) {
          state.subscription = action.payload;
        }
      })
      .addCase(updateSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update subscription";
      })

      // deleteSubscription
      .addCase(deleteSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubscription.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.subscriptions = state.subscriptions.filter(sub => sub._id !== action.payload);
        if (state.subscription?._id === action.payload) {
          state.subscription = null;
        }
      })
      .addCase(deleteSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete subscription";
      });

  },
});

export default subscriptionSlice.reducer;
