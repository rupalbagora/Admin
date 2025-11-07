import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";


export const addPackage = createAsyncThunk(
  "packages/add",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/packages/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      console.error("❌ Add Package API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchPackages = createAsyncThunk(
  "packages/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/packages");
      return data.data;
    } catch (error: any) {
      console.error("❌ Fetch Packages API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const deletePackage = createAsyncThunk(
  "packages/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await API.delete(`/packages/${id}`);
      return id;
    } catch (error: any) {
      console.error("❌ Delete Package API Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const packageSlice = createSlice({
  name: "packages",
  initialState: {
    items: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(addPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.items = state.items.filter((pkg) => pkg._id !== action.payload);
      });
  },
});

export default packageSlice.reducer;
