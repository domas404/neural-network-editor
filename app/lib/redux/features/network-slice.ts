"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Network } from "@/app/lib/data-types";

const initialState: Network = {
    dataset: "iris",
    modelId: "default"
}

export const networkSlice = createSlice({
    name: "param",
    initialState,
    reducers: {
        changeDataset: (state, action: PayloadAction<string>) => {
            console.log(`Dataset changed to ${action.payload}`);
            state.dataset = action.payload;
        },
        changeModel: (state, action: PayloadAction<string>) => {
            console.log(`Model changed to ${action.payload}`);
            state.modelId = action.payload;
        }
    }
});

export const { changeDataset, changeModel } = networkSlice.actions;
export default networkSlice.reducer;