// src/redux/Slice/Uploadcertificate/certificateSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";
import { type ICertificate } from "../../types/subadmintypes/uploadcertificate.types";

// ====================
// Thunks / Async actions
// ====================

// Fetch all certificates
export const fetchCertificates = createAsyncThunk<
	ICertificate[],
	void,
	{ rejectValue: string }
>("certificates/fetchAll", async (_, { rejectWithValue }) => {
	try {
		const res = await API.get("/certificates");
		return res.data.data as ICertificate[];
	} catch (err: any) {
		return rejectWithValue(
			err.response?.data?.message || "Error fetching certificates"
		);
	}
});

// Upload certificate
export const uploadCertificate = createAsyncThunk<
	ICertificate,
	FormData,
	{ rejectValue: string }
>("certificates/upload", async (formData, { rejectWithValue }) => {
	try {
		const res = await API.post("/certificates/upload", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return res.data.data as ICertificate;
	} catch (err: any) {
		return rejectWithValue(
			err.response?.data?.message || "Error uploading certificate"
		);
	}
});

// Update certificate
export const updateCertificate = createAsyncThunk<
	ICertificate,
	{ id: string; formData: FormData },
	{ rejectValue: string }
>("certificates/update", async ({ id, formData }, { rejectWithValue }) => {
	try {
		const res = await API.put(`/certificates/${id}`, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		return res.data.data as ICertificate;
	} catch (err: any) {
		return rejectWithValue(
			err.response?.data?.message || "Error updating certificate"
		);
	}
});

// Delete certificate
export const deleteCertificate = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>("certificates/delete", async (id, { rejectWithValue }) => {
	try {
		const res = await API.delete(`/certificates/${id}`);
		console.log("Delete response:", res.data);
		return id;
	} catch (err: any) {
		return rejectWithValue(
			err.response?.data?.message || "Error deleting certificate"
		);
	}
});

// ====================
// Slice
// ====================
interface CertificateState {
	items: ICertificate[];
	loading: boolean;
	error: string | null;
}

const initialState: CertificateState = {
	items: [],
	loading: false,
	error: null,
};

const certificateSlice = createSlice({
	name: "certificates",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Fetch
			.addCase(fetchCertificates.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCertificates.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchCertificates.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Failed to fetch certificates";
			})

			// Upload
			.addCase(uploadCertificate.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(uploadCertificate.fulfilled, (state, action) => {
				state.loading = false;
				state.items.unshift(action.payload);
			})
			.addCase(uploadCertificate.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Failed to upload certificate";
			})

			// Update
			.addCase(updateCertificate.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateCertificate.fulfilled, (state, action) => {
				state.loading = false;
				state.items = state.items.map((item) =>
					item._id === action.payload._id ? action.payload : item
				);
			})
			.addCase(updateCertificate.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Failed to update certificate";
			})

			// Delete
			.addCase(deleteCertificate.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteCertificate.fulfilled, (state, action) => {
				state.loading = false;
				state.items = state.items.filter((item) => item._id !== action.payload);
			})
			.addCase(deleteCertificate.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ?? "Failed to delete certificate";
			});
	},
});

export default certificateSlice.reducer;
