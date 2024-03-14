"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatasetProps } from "@/app/lib/data-types";


const initialState: DatasetProps = {
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
        uploadDataset: (state, action: PayloadAction<{ dataRows: [{}], labels: string[]}>) => {
            const columns = Object.keys(action.payload.dataRows[0]);
            const features = columns.slice(1, -1);
            const targets = action.payload.labels.flatMap(obj => Object.values(obj));
            state.dataset = action.payload.dataRows;
            state.columns = columns;
            state.features = features;
            state.selectedFeatures = new Array(features.length).fill(true);
            state.targets = targets;
            state.selectedTargets = new Array(targets.length).fill(true);
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
        },
    }
});

export const { uploadDataset, setTargets, updateSelectedFeatures, updateSelectedTargets } = datasetSlice.actions;
export default datasetSlice.reducer;