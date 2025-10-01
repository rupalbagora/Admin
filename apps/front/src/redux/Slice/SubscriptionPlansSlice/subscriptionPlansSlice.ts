import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
import API from '../../../api/axios';
import type{
  SubscriptionPlan,
  CreateSubscriptionPlanPayload,
  UpdateSubscriptionPlanPayload,
} from '../../types/subscriptionPlan.types';

interface SubscriptionPlansState {
  plans: SubscriptionPlan[];
  loading: boolean;
  error: string | null;
  currentPlan?: SubscriptionPlan | null;
}

const initialState: SubscriptionPlansState = {
  plans: [],
  loading: false,
  error: null,
  currentPlan: null,
};

// === Async Thunks ===

// Fetch all plans
export const fetchSubscriptionPlans = createAsyncThunk<
  SubscriptionPlan[],
  void,
  { rejectValue: string }
>('plans/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get<SubscriptionPlan[]>('/subscription-plans');
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch plans');
  }
});

// Create new plan
export const createSubscriptionPlan = createAsyncThunk<
  SubscriptionPlan,
  CreateSubscriptionPlanPayload,
  { rejectValue: string }
>('plans/create', async (data, { rejectWithValue }) => {
  try {
    const res = await API.post<SubscriptionPlan>('/subscription-plans', data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create plan');
  }
});

// Update existing plan
export const updateSubscriptionPlan = createAsyncThunk<
  SubscriptionPlan,
  { id: string; data: UpdateSubscriptionPlanPayload },
  { rejectValue: string }
>('plans/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await API.put<SubscriptionPlan>(`/subscription-plans/${id}`, data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update plan');
  }
});

// Delete a plan
export const deleteSubscriptionPlan = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>('plans/delete', async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/subscription-plans/${id}`);
    return { id };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete plan');
  }
});

const subscriptionPlansSlice = createSlice({
  name: 'subscriptionPlans',
  initialState,
  reducers: {
    setCurrentPlan(state, action: PayloadAction<SubscriptionPlan | null>) {
      state.currentPlan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load plans';
      })

      .addCase(createSubscriptionPlan.fulfilled, (state, action) => {
        state.plans.push(action.payload);
      })

      .addCase(updateSubscriptionPlan.fulfilled, (state, action) => {
        const index = state.plans.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.plans[index] = action.payload;
      })

      .addCase(deleteSubscriptionPlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter(plan => plan._id !== action.payload.id);
      });
  },
});

export const { setCurrentPlan } = subscriptionPlansSlice.actions;
export default subscriptionPlansSlice.reducer;
