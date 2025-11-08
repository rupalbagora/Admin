import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface IProductPackageState {
  packages: any[];
  loading: boolean;
  error: string | null;
}

const initialState: IProductPackageState = {
  packages: [],
  loading: false,
  error: null,
};

// Fetch all packages
export const fetchProductPackages = createAsyncThunk(
  "productPackages/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/product-packages");
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch packages");
    }
  }
);

// Delete package
export const deleteProductPackage = createAsyncThunk(
  "productPackages/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await API.delete(`/product-packages/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to delete package");
    }
  }
);

const productPackageSlice = createSlice({
  name: "productPackages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchProductPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProductPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = state.packages.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProductPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productPackageSlice.reducer;
