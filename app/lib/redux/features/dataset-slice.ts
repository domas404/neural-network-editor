"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatasetProps } from "@/app/lib/data-types";


const initialState: DatasetProps = {
    loaded: false,
    dataset: [{}],
    columns: [],
    features: [],
    targets: [],
    selectedFeatures: [],
    selectedTargets: [],
    featuresCount: 1,
    labelsCount: 1
}

export const datasetSlice = createSlice({
    name: "dataset",
    initialState,
    reducers: {
        uploadDataset: (state, action: PayloadAction<{ dataRows: any, labels: string[]}>) => {
            const columns = Object.keys(action.payload.dataRows[0]);
            const features = columns.slice(1, -1);
            const targets = action.payload.labels.flatMap(obj => Object.values(obj));
            const selectedFeatures = new Array(features.length).fill(true);
            const selectedTargets = new Array(targets.length).fill(true);
            state.dataset = action.payload.dataRows;
            state.columns = columns;
            state.features = features;
            state.selectedFeatures = selectedFeatures;
            state.targets = targets;
            state.selectedTargets = selectedTargets;
            state.featuresCount = selectedFeatures.filter(Boolean).length;
            state.labelsCount = selectedTargets.filter(Boolean).length;
            state.loaded = true;
        },
        updateSelectedFeatures: (state, action: PayloadAction<boolean[]>) => {
            state.selectedFeatures = action.payload;
            state.featuresCount = action.payload.filter(Boolean).length;
        },
        updateSelectedTargets: (state, action: PayloadAction<boolean[]>) => {
            state.selectedTargets = action.payload;
            state.labelsCount = action.payload.filter(Boolean).length;
        },
        updateDataset: (state, action: PayloadAction<any>) => {
            state.dataset = action.payload;
        }
    }
});

export const { uploadDataset, updateSelectedFeatures, updateSelectedTargets, updateDataset } = datasetSlice.actions;
export default datasetSlice.reducer;