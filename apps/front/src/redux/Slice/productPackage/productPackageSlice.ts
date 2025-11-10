import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface ProductPackage {
  _id: string;
  name: string;
  price: number;
  review?: string;
  description?: string;
  offers?: string;
  items: string[];
  usage?: string;
  image?: string;
  gender: string;
}

interface ProductPackageState {
  packages: ProductPackage[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductPackageState = {
  packages: [],
  loading: false,
  error: null,
};

// 🔹 Get all product packages
export const fetchProductPackages = createAsyncThunk(
  "productPackages/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/product-packages");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// 🔹 Add new product package
export const addProductPackage = createAsyncThunk(
  "productPackages/add",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/product-packages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add product package");
    }
  }
);

// 🔹 Edit product package
export const updateProductPackage = createAsyncThunk(
  "productPackages/update",
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/product-packages/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update product package");
    }
  }
);

// 🔹 Delete product package
export const deleteProductPackage = createAsyncThunk(
  "productPackages/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await API.delete(`/product-packages/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete product package");
    }
  }
);

const productPackageSlice = createSlice({
  name: "productPackages",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all product packages
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
      
      // 🔹 Add product package
      .addCase(addProductPackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages.unshift(action.payload);
      })
      .addCase(addProductPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Update product package
      .addCase(updateProductPackage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductPackage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.packages.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.packages[index] = action.payload;
        }
      })
      .addCase(updateProductPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Delete product package
      .addCase(deleteProductPackage.pending, (state) => {
        state.loading = true;
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

export const { clearError } = productPackageSlice.actions;
export default productPackageSlice.reducer;