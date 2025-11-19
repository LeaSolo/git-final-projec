import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
//import authReducer from "../features/auth/authApiSlice"; // ✅ הוספנו את זה
import authReducer from "../features/auth/authToken"



const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer, // ✅ הוספנו את ה־auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
