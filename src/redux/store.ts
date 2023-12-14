import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { userApi } from "../services/user"; 
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
})
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;