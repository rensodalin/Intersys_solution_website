import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  country?: string;
  role?: string;
  newsletter?: boolean;
  receiveUpdates?: boolean;
  downloadedPdfs?: Array<{
    title: string;
    url: string;
    downloadedAt: string;
  }>;
}

interface AuthState {
  user: UserState | null;
  loading: boolean;
  error: string | null;
  isAuthChecking: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthChecking: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    loginSuccess(state, action: PayloadAction<UserState>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuthChecking = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    initializeAuth(state, action: PayloadAction<UserState | null>) {
      state.user = action.payload;
      state.isAuthChecking = false;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  },
});

export const {
  setLoading,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  initializeAuth,
  setError,
} = authSlice.actions;

export default authSlice.reducer;
