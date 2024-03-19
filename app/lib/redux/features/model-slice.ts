"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Layer, ModelSet } from "@/app/lib/data-types";
import { InitialModels } from "@/app/lib/initial-model";
import { v4 } from "uuid";

const initialState: ModelSet = InitialModels;

export const models = createSlice({
    name: "models",
    initialState,
    reducers: {
        addLayer: (state, action: PayloadAction<{ modelName: string, order: number }>) => {
            const { modelName, order } = action.payload;
            const model = state[modelName];
            model.layers.splice(order, 0, {
                id: v4(),
                type: "hidden",
                order: order,
                neurons: [{ id: v4() }],
                activation: "relu"
            });
            for (let i=order+1; i<model.layers.length; i++){
                model.layers[i].order = model.layers[i].order+1;
            }
            return ({
                ...state,
                model
            });
        },
        removeLayer: (state, action: PayloadAction<{ modelName: string, order: number }>) => {
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
        addNeuronToLayer: (state, action: PayloadAction<{ modelName: string, layerId: string }>) => {
            const { modelName, layerId } = action.payload;
            const model = state[modelName];
            const layerToModify = model.layers.findIndex((el) => el.id === layerId);
            model.layers[layerToModify].neurons.push({ id: v4() });
        },
        updateInputLayer: (state, action: PayloadAction<{ modelName: string, neuronCount: number }>) => {
            const { modelName, neuronCount } = action.payload;
            const model = state[modelName];
            const initialInputNeurons = [];
            for (let i=0; i<neuronCount; i++) {
                initialInputNeurons.push({ id: v4() });
            }
            model.layers[0].neurons = initialInputNeurons;
        },
        updateOutputLayer: (state, action: PayloadAction<{ modelName: string, neuronCount: number }>) => {
            const { modelName, neuronCount } = action.payload;
            const model = state[modelName];
            const initialOutputNeurons = [];
            for (let i=0; i<neuronCount; i++) {
                initialOutputNeurons.push({ id: v4() });
            }
            model.layers[model.layers.length-1].neurons = initialOutputNeurons;
        },
        removeNeuronFromLayer: (state, action: PayloadAction<{ modelName: string, layerId: string }>) => {
            const { modelName, layerId } = action.payload;
            const model = state[modelName];
            const layerToModify = model.layers.findIndex((el) => el.id === layerId);
            model.layers[layerToModify].neurons.pop();
        },
        changeActivation: (state, action: PayloadAction<{ modelName: string, layerId: string, activation: string }>) => {
            const { activation, modelName, layerId } = action.payload;
            const model = state[modelName];
            const layerToModify = model.layers.findIndex((el) => el.id === layerId);
            model.layers[layerToModify].activation = activation;
        },
        addHiddenLayer: (state, action: PayloadAction<string>) => {
            const model = state[action.payload];
            const lastHiddenLayer = model.layers[model.layers.length-2];
            const neuronsToAdd = [];
            for (let i=0; i<lastHiddenLayer.neurons.length; i++) {
                neuronsToAdd.push({ id: v4() });
            }
            const newLayer: Layer = {
                id: v4(),
                activation: lastHiddenLayer.activation,
                neurons: neuronsToAdd,
                order: lastHiddenLayer.order + 1,
                type: "hidden"
            };
            model.layers.splice(model.layers.length-1, 0, newLayer);
        },
        removeHiddenLayer: (state, action: PayloadAction<string>) => {
            const model = state[action.payload];
            model.layers.splice(model.layers.length-2, 1);
        },
        reorderLayers: () => {
            
        },
    }
});

export const {
    addLayer,
    removeLayer,
    addNeuronToLayer,
    updateInputLayer,
    updateOutputLayer,
    removeNeuronFromLayer,
    addHiddenLayer,
    removeHiddenLayer,
    changeActivation,
} = models.actions;
export default models.reducer;