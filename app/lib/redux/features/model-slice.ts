"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModelSet } from "@/app/lib/data-types";
import { InitialModels } from "@/app/lib/initial-model";
import { v4 } from "uuid";

const initialState: ModelSet = InitialModels;

export const models = createSlice({
    name: "models",
    initialState,
    reducers: {
        addLayer: (state, action: PayloadAction<{modelName: string, order: number}>) => {
            const { modelName, order } = action.payload;
            const model = state[modelName];
            model.layers.splice(order, 0, {
                id: v4(),
                type: "hidden",
                order: order,
                neurons: [{ id: v4() }],
            });
            for (let i=order+1; i<model.layers.length; i++){
                model.layers[i].order = model.layers[i].order+1;
            }
            return ({
                ...state,
                model
            });
        },
        removeLayer: (state, action: PayloadAction<{modelName: string, order: number}>) => {
            const { modelName, order } = action.payload;
            const model = state[modelName];
            model.layers.splice(order, 1);
            for (let i=order; i<model.layers.length; i++){
                model.layers[i].order = model.layers[i].order-1;
            }
            return ({
                ...state,
                model
            });
        },
        addNeuronToLayer: () => {
            
        },
        removeNeuronFromLayer: () => {
            
        },
        reorderLayers: () => {
            
        },
    }
});

export const { addLayer, removeLayer } = models.actions;
export default models.reducer;