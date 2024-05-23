"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainHistory } from "@/app/lib/data-types";

const initialState: TrainHistory = {
    epoch: [],
    history: {
        acc: [],
        loss: [],
        val_acc: [],
        val_loss: [],
        precision: 0,
        recall: 0
    },
    confusionMatrix: [],
}

export const trainSlice = createSlice({
    name: "training",
    initialState,
    reducers: {
        updateTrainHistory: (state, action: PayloadAction<TrainHistory>) => {
            // console.log(`Dataset changed to ${action.payload}`);
            state.epoch = action.payload.epoch;
            state.history = action.payload.history;
            state.confusionMatrix = action.payload.confusionMatrix;
        },
    }
});

export const { updateTrainHistory } = trainSlice.actions;
export default trainSlice.reducer;