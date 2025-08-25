import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AuthState {
  token: string | null;
  user: UserInfo | null;
}

const loadFromStorage = (): AuthState => {
  if (typeof window === 'undefined') return { token: null, user: null };

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
  };
};

const initialState: AuthState = loadFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: UserInfo }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;