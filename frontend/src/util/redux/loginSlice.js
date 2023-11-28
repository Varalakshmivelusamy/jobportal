import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loggedIn: false,
    role: '',
    userEmail: '',
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.loggedIn = true;
      state.role = action.payload.role;
      state.userEmail = action.payload.userEmail;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loggedIn = false;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;
