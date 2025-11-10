import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface TermsCondition {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface TermsConditionState {
  termsCondition: TermsCondition | null;
  loading: boolean;
  error: string | null;
}

const initialState: TermsConditionState = {
  termsCondition: null,
  loading: false,
  error: null,
};

// 🔹 Get terms and conditions
export const fetchTermsCondition = createAsyncThunk(
  "termsCondition/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/terms-and-conditions");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔹 Create or update terms and conditions
export const createOrUpdateTermsCondition = createAsyncThunk(
  "termsCondition/createOrUpdate",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/terms-and-conditions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to save terms and conditions");
    }
  }
);

const termsConditionSlice = createSlice({
  name: "termsCondition",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearTermsCondition: (state) => {
      state.termsCondition = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch terms and conditions
      .addCase(fetchTermsCondition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTermsCondition.fulfilled, (state, action) => {
        state.loading = false;
        state.termsCondition = action.payload;
      })
      .addCase(fetchTermsCondition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // 🔹 Create or update terms and conditions
      .addCase(createOrUpdateTermsCondition.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdateTermsCondition.fulfilled, (state, action) => {
        state.loading = false;
        state.termsCondition = action.payload;
      })
      .addCase(createOrUpdateTermsCondition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearTermsCondition } = termsConditionSlice.actions;
export default termsConditionSlice.reducer;