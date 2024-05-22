"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Network } from "@/app/lib/data-types";

const initialState: Network = {
    dataset: "irisdata",
    modelId: "default",
    mode: "mlp"
}

export const networkSlice = createSlice({
    name: "network",
    initialState,
    reducers: {
        changeDataset: (state, action: PayloadAction<string>) => {
            console.log(`Dataset changed to ${action.payload}`);
            state.dataset = action.payload;
        },
        changeModel: (state, action: PayloadAction<string>) => {
            console.log(`Model changed to ${action.payload}`);
            state.modelId = action.payload;
        },
        changeMode: (state, action: PayloadAction<string>) => {
            console.log(`Mode changed to ${action.payload}`);
            state.mode = action.payload;
        },
        changeToDefaultModel: (state, action: PayloadAction<string>) => {
            if (action.payload === "mlp") {
                state.modelId = "default";
            } else if (action.payload === "cnn") {
                state.modelId = "defaultCNN";
            }

        }
    }
});

export const { changeDataset, changeModel, changeMode, changeToDefaultModel } = networkSlice.actions;
export default networkSlice.reducer;