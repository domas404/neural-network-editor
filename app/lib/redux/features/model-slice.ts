"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Layer, ModelSet } from "@/app/lib/data-types";
import { InitialModels, defaultModel } from "@/app/lib/initial-model";
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
        addHiddenLayerAfter: (state, action: PayloadAction<{ modelId: string, insertAfter: Layer, insertAfterIndex: number }>) => {
            const model = state[action.payload.modelId];
            const insertAfter = action.payload.insertAfter;
            const insertAfterIndex = action.payload.insertAfterIndex;

            const neuronsToAdd = [];
            for (let i=0; i<insertAfter.neurons.length; i++) {
                neuronsToAdd.push({ id: v4() });
            }
            const newLayer: Layer = {
                id: v4(),
                activation: insertAfterIndex === 0 ? "relu" : insertAfter.activation,
                neurons: neuronsToAdd,
                order: insertAfter.order + 1,
                type: "hidden"
            };
            model.layers.slice(insertAfterIndex + 1).forEach((layer) => {
                layer.order = layer.order + 1;
            })
            model.layers.splice(insertAfterIndex + 1, 0, newLayer);
        },
        removeHiddenLayer: (state, action: PayloadAction<string>) => {
            const model = state[action.payload];
            model.layers.splice(model.layers.length-2, 1);
        },
        reorderLayers: () => {
            
        },
        createModelFromDefault: (state, action: PayloadAction<{ modelId: string, modelName: string }>) => {
            const { modelId, modelName } = action.payload;
            const model: ModelSet = { [modelId]: {
                name: modelName,
                layers: defaultModel["default"].layers
            } };
            console.log(model);
            return {
                ...state,
                ...model
            }
        },
        createModelFromCurrent: (state, action: PayloadAction<{ modelId: string, modelName: string, createFrom: string }>) => {
            const { modelId, modelName, createFrom } = action.payload;
            const model: ModelSet = { [modelId]: {
                name: modelName,
                layers: state[createFrom].layers
            } };
            console.log(model);
            return {
                ...state,
                ...model
            }
        },
        updateModelName: (state, action: PayloadAction<{ modelId: string, newName: string }>) => {
            const { modelId, newName } = action.payload;
            state[modelId].name = newName;
        }
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
    addHiddenLayerAfter,
    removeHiddenLayer,
    changeActivation,
    createModelFromDefault,
    createModelFromCurrent,
    updateModelName
} = models.actions;
export default models.reducer;