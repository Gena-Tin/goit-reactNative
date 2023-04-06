import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: null,
    login: null,
    email: null,
    userAvatar: null
  },
  isAuth: false,
  loading: false, 
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      isAuth: payload
    }),
    authLogOut: () => (initialState),
  }
})