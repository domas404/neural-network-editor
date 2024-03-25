"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HyperparameterSet } from "@/app/lib/data-types";

const initialState: HyperparameterSet = {
    epochs: "1",
    learningRate: "0.1",
    batchSize: "1",
    optimizer: "SGD",
    trainTestRatio: "0.8"
}

export const paramSlice = createSlice({
    name: "param",
    initialState,
    reducers: {
        changeParameter: (state, action: PayloadAction<{ parameter: string, value: any }>) => {
            return {
                ...state,
                [action.payload.parameter]: action.payload.value
            }
        }
    }
});

export const {changeParameter} = paramSlice.actions;
export default paramSlice.reducer;