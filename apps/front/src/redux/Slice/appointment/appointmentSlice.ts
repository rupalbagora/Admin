import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export const verifyAppointment = createAsyncThunk(
  "appointment/verify",
  async (
    payload: { email: string; appointmentCode: string; chairNo: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/appointments/verify-appointment", payload);
      return data;
    } catch (error: any) {
      console.error(" Verify appointment error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong while verifying appointment"
      );
    }
  }
);

interface AppointmentState {
  loading: boolean;
  success: boolean;
  message: string | null;
  error: string | null;
}

const initialState: AppointmentState = {
  loading: false,
  success: false,
  message: null,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    resetAppointmentState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.success || false;
        state.message = action.payload?.message || "Appointment verified successfully";
      })
      .addCase(verifyAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;
