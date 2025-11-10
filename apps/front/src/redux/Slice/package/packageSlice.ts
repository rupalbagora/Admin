import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface Package {
  _id: string;
  title: string;
  price: string;
  services: string;
  about: string;
  discount?: string;
  review?: number;
  rating?: number;
  gender: string;
  image: string;
}

interface PackageState {
  packages: Package[];
  loading: boolean;
  error: string | null;
}

const initialState: PackageState = {
  packages: [],
  loading: false,
  error: null,
};

// 🔹 Get all packages
export const fetchPackages = createAsyncThunk(
  "packages/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/packages");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// 🔹 Add new package
export const addPackage = createAsyncThunk(
  "packages/add",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/packages/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add package");
    }
  }
);

// 🔹 Edit package
export const updatePackage = createAsyncThunk(
  "packages/update",
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/packages/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update package");
    }
  }
);

// 🔹 Delete package
export const deletePackage = createAsyncThunk(
  "packages/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await API.delete(`/packages/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete package");
    }
  }
);

const packageSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all packages
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // 🔹 Add package
      .addCase(addPackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages.unshift(action.payload);
      })
      .addCase(addPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Update package
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.packages.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.packages[index] = action.payload;
        }
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Delete package
      .addCase(deletePackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = state.packages.filter((p) => p._id !== action.payload);
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = packageSlice.actions;
export default packageSlice.reducer;