// redux/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { UpdateUserPayload} from "../types/auth.types";
import API from "../../api/axios";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "../types/auth.types";
import type{ IUser } from "../types/usera.types";

interface AuthState {
  user: AuthResponse["user"] | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const updateToken = createAsyncThunk<
  AuthResponse, // return type
  void, // no args needed
  { rejectValue: string } // meta
>("auth/updateToken", async (_, { rejectWithValue }) => {
  try {
    const res = await API.post<AuthResponse>("/auth");
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Token update failed"
    );
  }
});

export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {

  try {
    const res = await API.post<AuthResponse>("/auth/login", credentials);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Login failed");

  }
});

export const register = createAsyncThunk<AuthResponse, RegisterPayload>(
  "auth/register",
  async (data) => {
    const res = await API.post<AuthResponse>("/auth/register", data);
    if (res.data?.token) localStorage.setItem("token", res.data.token);
    return res.data;
  }
);
interface IRegisterReff {

  data: RegisterPayload;
  reff: string;
}

export const registerReff = createAsyncThunk<AuthResponse, IRegisterReff>(
  "auth/registerReff",
  async ({ data, reff }) => {
    const res = await API.post<AuthResponse>(
      `/auth/register?ref=${reff}`,
      data
    );
    if (res.data?.token) localStorage.setItem("token", res.data.token);
    return res.data;
  }
);

export const updateProfile = createAsyncThunk<
  { url: string }, // Response type
  FormData, // Argument type
  { rejectValue: string }
>("user/updateProfile", async (formData, { rejectWithValue }) => {
  try {
    const res = await API.put<{ url: string }>("/auth/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Profile update failed"
    );
  }
});
export const getUserProfile = createAsyncThunk<
  IUser, // Returned data type
  void, // No arguments
  { rejectValue: string }
>("user/getUserProfile", async (_, { rejectWithValue }) => {
  try {
    const res = await API.get<{ user: IUser }>("/auth/profile");
    return res.data.user;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch user profile"
    );
  }
});




export const updateUserProfile = createAsyncThunk<
  IUser, // Returne data type
  UpdateUserPayload, // Argument type — the fields to update
  { rejectValue: string }
>("user/updateUserProfile", async (payload, { rejectWithValue }) => {
  try {
    const res = await API.put<{ user: IUser }>("/auth/profile-update", payload);
    return res.data.user;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to update user profile"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user.avatar = action.payload.url;
        }
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(updateToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(updateToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(registerReff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerReff.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerReff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load profile";
      });
  },

});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
