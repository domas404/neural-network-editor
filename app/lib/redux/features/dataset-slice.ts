"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatasetProps, Dataset } from "@/app/lib/data-types";
import allDatasets from "../../all-datasets";
import { ShuffleData, getFeaturesAndLabels } from "../../train-model/build-model";

const initialState: { [id: string]: DatasetProps } = {};
allDatasets.forEach((item) => {
    const emptyDataset: DatasetProps = {
        loaded: false,
        dataset: [{}],
        columns: [],
        features: [],
        labels: [],
        selectedFeatures: [],
        selectedLabels: [],
        featuresCount: 1,
        labelsCount: 1
    }
    initialState[item.id] = emptyDataset
});

export const datasetSlice = createSlice({
    name: "dataset",
    initialState,
    reducers: {
        uploadDataset: (state, action: PayloadAction<{ datasetName: string, dataRows: any, labels: string[]}>) => {
            if (state[action.payload.datasetName].loaded) {
                return;
            }
            const columns = Object.keys(action.payload.dataRows[0]);
            const features = columns.slice(1, -1);
            const labels = action.payload.labels.flatMap(obj => Object.values(obj));
            const selectedFeatures = new Array(features.length).fill(true);
            const selectedLabels = new Array(labels.length).fill(true);
            
            const shuffledDataRows = ShuffleData(action.payload.dataRows);

            const newDataset: DatasetProps = {
                loaded: true,
                dataset: shuffledDataRows,
                columns: columns,
                features: features,
                labels: labels,
                selectedFeatures: selectedFeatures,
                selectedLabels: selectedLabels,
                featuresCount: selectedFeatures.filter(Boolean).length,
                labelsCount: selectedLabels.filter(Boolean).length
            }
            console.log("dataset uploaded");
            state[action.payload.datasetName] = newDataset;
        },
        updateSelectedFeatures: (state, action: PayloadAction<{ datasetName: string, selectedFeatures: boolean[] }>) => {
            const { datasetName, selectedFeatures } = action.payload;
            state[datasetName].selectedFeatures = selectedFeatures;
            state[datasetName].featuresCount = selectedFeatures.filter(Boolean).length;
        },
        updateSelectedLabels: (state, action: PayloadAction<{ datasetName: string, selectedLabels: boolean[] }>) => {
            const { datasetName, selectedLabels } = action.payload;
            state[datasetName].selectedLabels = selectedLabels;
            state[datasetName].labelsCount = selectedLabels.filter(Boolean).length;
        },
        updateDataset: (state, action: PayloadAction<{ datasetName: string, updatedRows: any }>) => {
            const { datasetName, updatedRows } = action.payload;
            if (!state[datasetName].loaded) {
                const shuffledDataRows = ShuffleData(updatedRows);
                state[datasetName].dataset = shuffledDataRows;
                state[datasetName].loaded = true;
            }
        },
        setAsLoading: (state, action: PayloadAction<string>) => {
            state[action.payload].loaded = false;
        },
        shuffleDataRows: (state, action: PayloadAction<string>) => {
            const shuffledData = ShuffleData(state[action.payload].dataset);
            state[action.payload].dataset = shuffledData;
        }
    }
});

export const { uploadDataset, updateSelectedFeatures, updateSelectedLabels, updateDataset, setAsLoading, shuffleDataRows } = datasetSlice.actions;
export default datasetSlice.reducer;