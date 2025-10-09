import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios"; 
import type { IYoutubeVideo, YoutubeState } from "../../types/subadmintypes/youtubelinks.types";

// Fetch all videos
export const fetchYoutubeVideos = createAsyncThunk<
  IYoutubeVideo[],
  void,
  { rejectValue: string }
>("youtube/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await API.get("/youtube");
    return res.data.data as IYoutubeVideo[];
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to fetch videos"
    );
  }
});

// Create video (file or URL)
export const createYoutubeVideo = createAsyncThunk<
  IYoutubeVideo,
  FormData,
  { rejectValue: string }
>("youtube/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await API.post("/youtube", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data as IYoutubeVideo;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to create video"
    );
  }
});

// Update video
export const updateYoutubeVideo = createAsyncThunk<
  IYoutubeVideo,
  { id: string; data: FormData },
  { rejectValue: string }
>("youtube/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await API.patch(`/youtube/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data as IYoutubeVideo;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to update video"
    );
  }
});

// Delete video
export const deleteYoutubeVideo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("youtube/delete", async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/youtube/${id}`);
    return id;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to delete video"
    );
  }
});

const initialState: YoutubeState = {
  videos: [],
  video: null,
  loading: false,
  error: null,
};

const youtubeSlice = createSlice({
  name: "youtube",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
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
        state.error = action.payload ?? "Failed to fetch videos";
      })

      // create
      .addCase(createYoutubeVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createYoutubeVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.unshift(action.payload);
      })
      .addCase(createYoutubeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create video";
      })

      // update
      .addCase(updateYoutubeVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateYoutubeVideo.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.videos.findIndex((v) => v._id === action.payload._id);
        if (idx !== -1) state.videos[idx] = action.payload;
      })
      .addCase(updateYoutubeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update video";
      })

      // delete
      .addCase(deleteYoutubeVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteYoutubeVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.filter((v) => v._id !== action.payload);
      })
      .addCase(deleteYoutubeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete video";
      });
  },
});

export default youtubeSlice.reducer;
