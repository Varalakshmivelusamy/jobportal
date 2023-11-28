
// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isAuthenticated: false,
//     role: '',
//     email: '',
//     userId: '',
//     token: '',
//     error: null,
//   },
//   reducers: {
//     loginSuccess: (state, action) => {
//       const { role, email, userId, token } = action.payload;
//       state.isAuthenticated = true;
//       state.role = role;
     
//       state.email = email;
  
//       state.userId = userId;

//       state.token = token;
//       state.error = null;
//       // Save to localStorage
//       localStorage.setItem('userId', userId);
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('email', email);
//       localStorage.setItem('token', token);
//     },
//     loginFailure: (state, action) => {
//       state.isAuthenticated = false;
//       state.role = '';
//       state.email = '';
//       state.userId = '';
//       state.token = '';
//       state.error = action.payload;
//       // Clear localStorage on failure
//       localStorage.removeItem('userId');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('email');
//       localStorage.removeItem('token');
//     },
//   },
// });

// export const { loginSuccess, loginFailure } = authSlice.actions;
// export const selectAuth = (state) => state.auth;
// export default authSlice.reducer;



// authSlice.js



// // authSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   token: localStorage.getItem('token') || null,
//   userId: localStorage.getItem('u serId') || null,
//   email: localStorage.getItem('email') || null,
//   role: localStorage.getItem('userRole') || null,
// };

// const authSlice = createSlice({
    
//   name: 'auth',
//   initialState,
//   reducers: {
//     successLogin: (state, action) => {
//         console.log("@@@@@")
//       const { token, userId, email, role } = action.payload;
//       state.token = token;
//       state.userId = userId;
//       state.email = email;
//       state.role = role;

     
//       localStorage.setItem('userId', userId);
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('email', email);
//       localStorage.setItem('token', token);

//       console.log("token",
//       token);
//       console.log("userid",userId)
//     },
//     loginFailure: (state) => {
//       // Handle failure or clear the state if needed
//       state.token = null;
//       state.userId = null;
//       state.email = null;
//       state.role = null;

//       // Clear localStorage on login failure
//       localStorage.removeItem('userId');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('email');
//       localStorage.removeItem('token');
//     },
//     logout: (state) => {
//       // Handle logout or clear the state if needed
//       state.token = null;
//       state.userId = null;
//       state.email = null;
//       state.role = null;

//       // Clear localStorage on logout
//       localStorage.removeItem('userId');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('email');
//       localStorage.removeItem('token');
//     },
//   },
// });

// export const { successLogin, loginFailure, logout } = authSlice.actions;
// export const selectAuth = (state) => state.auth;
// export default authSlice.reducer;



// authSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   token: localStorage.getItem('token') || null,
//   userId: localStorage.getItem('userId') || null,
//   email: localStorage.getItem('email') || null,
//   role: localStorage.getItem('userRole') || null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       const { token, userId, email, role } = action.payload;
//       state.token = token;
//       state.userId = userId;
//       state.email = email;
//       state.role = role;

//       // Update localStorage
//       localStorage.setItem('userId', userId);
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('email', email);
//       localStorage.setItem('token', token);
//     },
//     loginFailure: (state) => {
//       // Handle failure or clear the state if needed
//       state.token = null;
//       state.userId = null;
//       state.email = null;
//       state.role = null;

//       // Clear localStorage on login failure
//       localStorage.removeItem('userId');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('email');
//       localStorage.removeItem('token');
//     },
//     logout: (state) => {
//       // Handle logout or clear the state if needed
//       state.token = null;
//       state.userId = null;
//       state.email = null;
//       state.role = null;

//       // Clear localStorage on logout
//       localStorage.removeItem('userId');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('email');
//       localStorage.removeItem('token');
//     },
//   },
// });

// export const { loginSuccess, loginFailure, logout } = authSlice.actions;
// export const selectAuth = (state) => state.auth;
// export default authSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// const parseStoredValue = (key) => {
//   const storedValue = localStorage.getItem(key);
//   try {
//     return storedValue ? JSON.parse(storedValue) : null;
//   } catch (error) {
//     console.error(`Error parsing ${key} from localStorage:`, error);
//     return null;
//   }
// };

// const initialState = {
//   token: localStorage.getItem('token') || null,
//   userId: parseStoredValue('userId') || null,
//   email: localStorage.getItem('email') || null,
//   role: localStorage.getItem('userRole') || null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       const { token, userId, email, role } = action.payload;
//       state.token = token;
//       state.userId = userId;
//       state.email = email;
//       state.role = role;

//       // Update localStorage
//       localStorage.setItem('userId', JSON.stringify(userId));
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('email', email);
//       localStorage.setItem('token', token);
//     },
//     loginFailure: (state) => {
//       // Handle failure or clear the state if needed
//       state.token = null;
//       state.userId = null;
//       state.email = null;
//       state.role = null;

//       // Clear localStorage on login failure
//       localStorage.removeItem('userId');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('email');
//       localStorage.removeItem('token');
//     },
//     logout: (state) => {
//       // Handle logout or clear the state if needed
//       state.token = null;
//       state.userId = null;
//       state.email = null;
//       state.role = null;

//       // Clear localStorage on logout
//       localStorage.removeItem('userId');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('email');
//       localStorage.removeItem('token');
//     },
//   },
// });

// export const { loginSuccess, loginFailure, logout } = authSlice.actions;
// export const selectAuth = (state) => state.auth;
// export default authSlice.reducer;



// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') || null,
  email: localStorage.getItem('email') || null,
  role: localStorage.getItem('userRole') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, userId, email, role } = action.payload;
      state.token = token;
      state.userId = userId;
      state.email = email;
      state.role = role;

      // Update localStorage
      localStorage.setItem('userId', userId);
      localStorage.setItem('userRole', role);
      localStorage.setItem('email', email);
      localStorage.setItem('token', token);
    },
    loginFailure: (state) => {
      state.token = null;
      state.userId = null;
      state.email = null;
      state.role = null;

      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.email = null;
      state.role = null;

      // Clear localStorage on logout
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
