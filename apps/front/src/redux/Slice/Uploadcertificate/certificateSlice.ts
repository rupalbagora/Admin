import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface Certificate {
  _id: string;
  title: string;
  imageUrl: string;
  addedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface CertificateState {
  certificates: Certificate[];
  loading: boolean;
  error: string | null;
}

const initialState: CertificateState = {
  certificates: [],
  loading: false,
  error: null,
};

// 🔹 Get all certificates
export const fetchCertificates = createAsyncThunk(
  "certificates/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/certificates");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// 🔹 Add new certificate
export const addCertificate = createAsyncThunk(
  "certificates/add",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/certificates/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add certificate");
    }
  }
);

// 🔹 Edit certificate
export const updateCertificate = createAsyncThunk(
  "certificates/update",
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/certificates/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update certificate");
    }
  }
);

// 🔹 Delete certificate
export const deleteCertificate = createAsyncThunk(
  "certificates/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await API.delete(`/certificates/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete certificate");
    }
  }
);

const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all certificates
      .addCase(fetchCertificates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // 🔹 Add certificate
      .addCase(addCertificate.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates.unshift(action.payload);
      })
      .addCase(addCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Update certificate
      .addCase(updateCertificate.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.certificates.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.certificates[index] = action.payload;
        }
      })
      .addCase(updateCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Delete certificate
      .addCase(deleteCertificate.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = state.certificates.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = certificateSlice.actions;
export default certificateSlice.reducer;