import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface PrivacyPolicy {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface PrivacyPolicyState {
  privacyPolicy: PrivacyPolicy | null;
  loading: boolean;
  error: string | null;
}

const initialState: PrivacyPolicyState = {
  privacyPolicy: null,
  loading: false,
  error: null,
};

// 🔹 Get privacy policy
export const fetchPrivacyPolicy = createAsyncThunk(
  "privacyPolicy/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/privacy-policy");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔹 Create or update privacy policy
export const createOrUpdatePrivacyPolicy = createAsyncThunk(
  "privacyPolicy/createOrUpdate",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/privacy-policy", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to save privacy policy");
    }
  }
);

const privacyPolicySlice = createSlice({
  name: "privacyPolicy",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPrivacyPolicy: (state) => {
      state.privacyPolicy = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch privacy policy
      .addCase(fetchPrivacyPolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrivacyPolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.privacyPolicy = action.payload;
      })
      .addCase(fetchPrivacyPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // 🔹 Create or update privacy policy
      .addCase(createOrUpdatePrivacyPolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrUpdatePrivacyPolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.privacyPolicy = action.payload;
      })
      .addCase(createOrUpdatePrivacyPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearPrivacyPolicy } = privacyPolicySlice.actions;
export default privacyPolicySlice.reducer;