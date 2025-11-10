import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface AboutSalon {
  _id: string;
  title: string;
  description: string;
  image: string;
  addedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface AboutSalonState {
  aboutSalons: AboutSalon[];
  loading: boolean;
  error: string | null;
}

const initialState: AboutSalonState = {
  aboutSalons: [],
  loading: false,
  error: null,
};

// 🔹 Get all about salon entries
export const fetchAboutSalons = createAsyncThunk(
  "aboutSalons/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/about-salon");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// 🔹 Add new about salon entry
export const addAboutSalon = createAsyncThunk(
  "aboutSalons/add",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/about-salon", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add salon information");
    }
  }
);

// 🔹 Edit about salon entry
export const updateAboutSalon = createAsyncThunk(
  "aboutSalons/update",
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/about-salon/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update salon information");
    }
  }
);

// 🔹 Delete about salon entry
export const deleteAboutSalon = createAsyncThunk(
  "aboutSalons/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await API.delete(`/about-salon/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete salon information");
    }
  }
);

const aboutSalonSlice = createSlice({
  name: "aboutSalons",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all about salons
      .addCase(fetchAboutSalons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutSalons.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutSalons = action.payload;
      })
      .addCase(fetchAboutSalons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // 🔹 Add about salon
      .addCase(addAboutSalon.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAboutSalon.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutSalons.unshift(action.payload);
      })
      .addCase(addAboutSalon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Update about salon
      .addCase(updateAboutSalon.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAboutSalon.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.aboutSalons.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) {
          state.aboutSalons[index] = action.payload;
        }
      })
      .addCase(updateAboutSalon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Delete about salon
      .addCase(deleteAboutSalon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAboutSalon.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutSalons = state.aboutSalons.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteAboutSalon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = aboutSalonSlice.actions;
export default aboutSalonSlice.reducer;