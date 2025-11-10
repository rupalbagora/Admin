import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface Offer {
  _id: string;
  title: string;
  description: string;
  discount: string;
  date: string;
  gender: string;
  imageUrl: string;
}

interface OfferState {
  offers: Offer[];
  loading: boolean;
  error: string | null;
}

const initialState: OfferState = {
  offers: [],
  loading: false,
  error: null,
};

// 🔹 Get all offers
export const fetchOffers = createAsyncThunk(
  "offers/fetchAll", 
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/offers");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// 🔹 Add new offer
export const addOffer = createAsyncThunk(
  "offers/add",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/offers/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add offer");
    }
  }
);

// 🔹 Edit offer
export const updateOffer = createAsyncThunk(
  "offers/update",
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/offers/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update offer");
    }
  }
);

// 🔹 Delete offer
export const deleteOffer = createAsyncThunk(
  "offers/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/offers/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete offer");
    }
  }
);

const offerSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all offers
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // 🔹 Add offer
      .addCase(addOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offers.unshift(action.payload);
      })
      .addCase(addOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Update offer
      .addCase(updateOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.offers.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) {
          state.offers[index] = action.payload;
        }
      })
      .addCase(updateOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Delete offer
      .addCase(deleteOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = state.offers.filter((o) => o._id !== action.payload);
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = offerSlice.actions;
export default offerSlice.reducer;