"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface datasetProps {
    dataset: [{}],
    columns: string[],
    features: string[],
    targets: string[],
    selectedFeatures: boolean[],
    selectedTargets: boolean[],
}

const initialState: datasetProps = {
    dataset: [{}],
    columns: [],
    features: [],
    targets: [],
    selectedFeatures: [],
    selectedTargets: [],
}

export const datasetSlice = createSlice({
    name: "dataset",
    initialState,
    reducers: {
        uploadDataset: (state, action: PayloadAction<[{}]>) => {
            const columns = Object.keys(action.payload[0]);
            const features = columns.slice(1, -1);
            state.dataset = action.payload;
            state.columns = columns;
            state.features = features;
            state.selectedFeatures = new Array(features.length).fill(true);
        },
        setTargets: (state, action: PayloadAction<string[]>) => {
            const targets = action.payload.flatMap(obj => Object.values(obj));
            state.targets = targets;
            state.selectedTargets = new Array(targets.length).fill(true);
        },
        updateSelectedFeatures: (state, action: PayloadAction<boolean[]>) => {
            state.selectedFeatures = action.payload;
        },
        updateSelectedTargets: (state, action: PayloadAction<boolean[]>) => {
            state.selectedTargets = action.payload;
            // console.log(action.payload);
            // console.log(`Model changed to ${action.payload}`);
            // state.modelId = action.payload;
        },
    }
});

export const { uploadDataset, setTargets, updateSelectedFeatures, updateSelectedTargets } = datasetSlice.actions;
export default datasetSlice.reducer;