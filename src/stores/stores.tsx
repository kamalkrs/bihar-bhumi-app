import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlices'

export const stores = configureStore({
    reducer: userReducer
})

export type RootState = ReturnType<typeof stores.getState>
export type AppDispatch = typeof stores.dispatch