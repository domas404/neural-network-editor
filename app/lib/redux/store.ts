"use client";

import { createSlice, configureStore } from '@reduxjs/toolkit';
import paramReducer from "./features/param-slice";

export const store = configureStore({
    reducer: {
        paramReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
