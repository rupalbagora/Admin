import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios";

export interface YoutubeVideo {
  _id: string;
  title: string;
  videoUrl?: string;
  videoPath?: string;
  uploadedAt: string;
  addedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface YoutubeVideoState {
  videos: YoutubeVideo[];
  loading: boolean;
  error: string | null;
}

const initialState: YoutubeVideoState = {
  videos: [],
  loading: false,
  error: null,
};

// 🔹 Get all YouTube videos
export const fetchYoutubeVideos = createAsyncThunk(
  "youtubeVideos/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/youtube");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// 🔹 Add new YouTube video
export const addYoutubeVideo = createAsyncThunk(
  "youtubeVideos/add",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/youtube", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add video");
    }
  }
);

// 🔹 Edit YouTube video
export const updateYoutubeVideo = createAsyncThunk(
  "youtubeVideos/update",
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const { data } = await API.patch(`/youtube/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update video");
    }
  }
);

// 🔹 Delete YouTube video
export const deleteYoutubeVideo = createAsyncThunk(
  "youtubeVideos/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await API.delete(`/youtube/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete video");
    }
  }
);

const youtubeSlice = createSlice({
  name: "youtubeVideos",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch all videos
      .addCase(fetchYoutubeVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchYoutubeVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchYoutubeVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // 🔹 Add video
      .addCase(addYoutubeVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addYoutubeVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.unshift(action.payload);
      })
      .addCase(addYoutubeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Update video
      .addCase(updateYoutubeVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateYoutubeVideo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.videos.findIndex((v) => v._id === action.payload._id);
        if (index !== -1) {
          state.videos[index] = action.payload;
        }
      })
      .addCase(updateYoutubeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Delete video
      .addCase(deleteYoutubeVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteYoutubeVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.filter((v) => v._id !== action.payload);
      })
      .addCase(deleteYoutubeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = youtubeSlice.actions;
export default youtubeSlice.reducer;