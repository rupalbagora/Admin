import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CertificateState {
  loading: boolean;
  success: boolean;
  error: string | null;
  certificates: any[];
}

const initialState: CertificateState = {
  loading: false,
  success: false,
  error: null,
  certificates: [],
};

export const uploadCertificate = createAsyncThunk(
  "certificates/upload",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/certificates/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Certificate upload failed"
      );
    }
  }
);

const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadCertificate.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates.push(action.payload);
      })
      .addCase(uploadCertificate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default certificateSlice.reducer;
