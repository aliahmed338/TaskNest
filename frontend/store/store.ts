import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import userReducer from "./slices/userSlice";
import { userApi } from "./api/userApi";
export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authApi.middleware])
      .concat([userApi.middleware]),
});
