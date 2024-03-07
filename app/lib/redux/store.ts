"use client";

import { configureStore } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import paramReducer from "./features/param-slice";
import modelsReducer from "./features/model-slice";
import networkReducer from "./features/network-slice";
import infoMenuReducer from './features/info-menu-slice';

export const store = configureStore({
    reducer: {
        paramReducer,
        modelsReducer,
        networkReducer,
        infoMenuReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
