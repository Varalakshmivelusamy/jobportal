import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import authReducer from './authSlice';
import mainReducer from './mainPageSlice'
const store = configureStore({
  reducer: {
    login: loginReducer,
    auth: authReducer,
    mainPage:mainReducer
 

  },
});

export default store;
