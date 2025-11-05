import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface Offer {
  _id: string;
  title: string;
  description: string;
  discount: number;
  startDate: string;
  endDate: string;
  imageUrl?: string;
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
export const fetchOffers = createAsyncThunk("offers/fetchAll", async () => {
  const { data } = await API.get("/offers");
  return data.data;
});

// 🔹 Add new offer
export const addOffer = createAsyncThunk(
  "offers/add",
  async (formData: FormData) => {
    const { data } = await API.post("/offers/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  }
);

// 🔹 Edit offer
export const updateOffer = createAsyncThunk(
  "offers/update",
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const { data } = await API.put(`/offers/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  }
);

// 🔹 Delete offer (with error handling)
export const deleteOffer = createAsyncThunk(
  "offers/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/offers/${id}`);
      console.log("✅ Offer deleted:", data);
      return id;
    } catch (error: any) {
      console.error("❌ Delete API error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const offerSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all
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
        state.error = action.error.message || "Failed to fetch offers";
      })

      // 🔹 Add offer
      .addCase(addOffer.fulfilled, (state, action) => {
        state.offers.push(action.payload);
      })

      // 🔹 Update offer
      .addCase(updateOffer.fulfilled, (state, action) => {
        const index = state.offers.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.offers[index] = action.payload;
      })

      // 🔹 Delete offer
      .addCase(deleteOffer.fulfilled, (state, action) => {
        console.log("🗑️ Offer removed from state:", action.payload);
        state.offers = state.offers.filter((o) => o._id !== action.payload);
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to delete offer";
        console.error("❌ Delete failed:", action.payload);
      });
  },
});

export default offerSlice.reducer;
