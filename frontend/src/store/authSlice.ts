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
  isAdmin?: boolean;
  profileCompleted?: boolean;
  company?: string;
  newsletter?: boolean;
  receiveUpdates?: boolean;
  updatedAt?: string;
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

const STORAGE_KEY = "intersys_user";

const loadStoredUser = (): UserState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const cachedUser = loadStoredUser();

const initialState: AuthState = {
  user: cachedUser,
  loading: false,
  error: null,
  isAuthChecking: !cachedUser,
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
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      } catch (err) {
        console.error("Failed to store user session locally:", err);
      }
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error("Failed to clear local user session:", err);
      }
    },
    initializeAuth(state, action: PayloadAction<UserState | null>) {
      state.user = action.payload;
      state.isAuthChecking = false;
      state.loading = false;
      try {
        if (action.payload) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (err) {
        console.error("Failed to sync local user session:", err);
      }
    },
    finishAuthCheck(state) {
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
  finishAuthCheck,
  setError,
} = authSlice.actions;

export default authSlice.reducer;
