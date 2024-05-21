"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConvolutionLayer, Layer, ModelSet, Pool, PoolingLayer } from "@/app/lib/data-types";
import { InitialModels, defaultModel } from "@/app/lib/initial-model";
import { v4 } from "uuid";

const initialState: ModelSet = InitialModels;

export const models = createSlice({
    name: "models",
    initialState,
    reducers: {
        removeLayer: (state, action: PayloadAction<{ modelName: string, layerId: string }>) => {
            const { modelName, layerId } = action.payload;
            const model = state[modelName];
            const layerToRemove = model.layers.findIndex((item) => item.id === layerId);
            if (layerToRemove === 0 || layerToRemove === model.layers.length-1 || model.layers.length <= 3) {
                return;
            }
            model.layers.slice(layerToRemove + 1).forEach((layer) => {
                layer.order = layer.order - 1;
            })
            model.layers.splice(layerToRemove, 1);
        },
        addNeuronToLayer: (state, action: PayloadAction<{ modelName: string, layerId: string }>) => {
            const { modelName, layerId } = action.payload;
            const model = state[modelName];
            const layerToModifyIndex = model.layers.findIndex((el) => el.id === layerId);
            const layerToModify = model.layers[layerToModifyIndex] as Layer;
            layerToModify.neurons.push({ id: v4() });
            layerToModify.itemCount++;
        },
        updateInputLayer: (state, action: PayloadAction<{ modelName: string, neuronCount: number }>) => {
            const { modelName, neuronCount } = action.payload;
            const model = state[modelName];
            const initialInputNeurons = [];
            for (let i=0; i<neuronCount; i++) {
                initialInputNeurons.push({ id: v4() });
            }
            const inputLayer = model.layers[0] as Layer;
            inputLayer.neurons = initialInputNeurons;
            inputLayer.itemCount = initialInputNeurons.length;
        },
        updateOutputLayer: (state, action: PayloadAction<{ modelName: string, neuronCount: number }>) => {
            const { modelName, neuronCount } = action.payload;
            const model = state[modelName];
            const initialOutputNeurons = [];
            for (let i=0; i<neuronCount; i++) {
                initialOutputNeurons.push({ id: v4() });
            }
            const outputLayer = model.layers[model.layers.length-1] as Layer;
            outputLayer.neurons = initialOutputNeurons;
            outputLayer.itemCount = initialOutputNeurons.length;
        },
        removeNeuronFromLayer: (state, action: PayloadAction<{ modelName: string, layerId: string }>) => {
            const { modelName, layerId } = action.payload;
            const model = state[modelName];
            const layerToModifyIndex = model.layers.findIndex((el) => el.id === layerId);
            const layerToModify = model.layers[layerToModifyIndex] as Layer;
            layerToModify.neurons.pop();
            layerToModify.itemCount--;
        },
        changeActivation: (state, action: PayloadAction<{ modelName: string, layerId: string, activation: string }>) => {
            const { activation, modelName, layerId } = action.payload;
            const model = state[modelName];
            const layerToModifyIndex = model.layers.findIndex((el) => el.id === layerId);
            const layerToModify = model.layers[layerToModifyIndex] as Layer | ConvolutionLayer;
            layerToModify.activation = activation;
        },
        addHiddenLayer: (state, action: PayloadAction<string>) => {
            const model = state[action.payload];
            const lastHiddenLayer = model.layers[model.layers.length-2] as Layer;
            const neuronsToAdd = [];
            for (let i=0; i<lastHiddenLayer.itemCount; i++) {
                neuronsToAdd.push({ id: v4() });
            }
            const newLayer: Layer = {
                id: v4(),
                activation: lastHiddenLayer.activation,
                neurons: neuronsToAdd,
                order: lastHiddenLayer.order + 1,
                type: "hidden",
                itemCount: neuronsToAdd.length
            };
            model.layers.splice(model.layers.length-1, 0, newLayer);
        },
        addHiddenLayerAfter: (state, action: PayloadAction<{ modelId: string, insertAfter: Layer, insertAfterIndex: number, newLayerId: string }>) => {
            const { modelId, insertAfter, insertAfterIndex, newLayerId } = action.payload;
            const model = state[modelId];

            const neuronsToAdd = [];
            for (let i=0; i<insertAfter.itemCount; i++) {
                neuronsToAdd.push({ id: v4() });
            }
            const newLayer: Layer = {
                id: newLayerId,
                activation: insertAfterIndex === 0 ? "relu" : insertAfter.activation,
                neurons: neuronsToAdd,
                order: insertAfter.order + 1,
                type: "hidden",
                itemCount: neuronsToAdd.length
            };
            model.layers.slice(insertAfterIndex + 1).forEach((layer) => {
                layer.order = layer.order + 1;
            })
            model.layers.splice(insertAfterIndex + 1, 0, newLayer);
        },
        addConvolutionLayerAfter: (state, action: PayloadAction<{ modelId: string, insertAfter: ConvolutionLayer | PoolingLayer, insertAfterIndex: number, newLayerId: string }>) => {
            const { modelId, insertAfter, insertAfterIndex, newLayerId } = action.payload;
            const model = state[modelId];

            const newLayer: ConvolutionLayer = {
                id: newLayerId,
                activation: "relu",
                order: insertAfter.order + 1,
                type: "convolution",
                depth: 1,
                filters: [{ id: v4() }, { id: v4() }, { id: v4() }],
                kernelSize: 2,
                stride: 1,
                itemCount: 3,
                padding: 0
            };
            model.layers.slice(insertAfterIndex + 1).forEach((layer) => {
                layer.order = layer.order + 1;
            })
            model.layers.splice(insertAfterIndex + 1, 0, newLayer);
            if (model.layers[insertAfterIndex+2].type === "pooling") {
                const poolingLayerToModify = model.layers[insertAfterIndex+2] as PoolingLayer;
                const newPools: Pool[] = [];
                for (let i=0; i<newLayer.itemCount; i++) {
                    newPools.push({ id: v4() });
                }
                poolingLayerToModify.pools = newPools;
                poolingLayerToModify.itemCount = newPools.length;
            }
        },
        addPoolingLayerAfter: (state, action: PayloadAction<{ modelId: string, insertAfter: ConvolutionLayer | PoolingLayer, insertAfterIndex: number, newLayerId: string }>) => {
            const { modelId, insertAfter, insertAfterIndex, newLayerId } = action.payload;
            const model = state[modelId];

            const poolsToAdd = [];
            for (let i=0; i<insertAfter.itemCount; i++) {
                poolsToAdd.push({ id: v4() });
            }

            const newLayer: PoolingLayer = {
                id: newLayerId,
                order: insertAfter.order + 1,
                type: "pooling",
                depth: 1,
                pools: poolsToAdd,
                poolSize: 2,
                stride: 1,
                itemCount: poolsToAdd.length,
                padding: 0,
                poolType: "max"
            };
            model.layers.slice(insertAfterIndex + 1).forEach((layer) => {
                layer.order = layer.order + 1;
            })
            model.layers.splice(insertAfterIndex + 1, 0, newLayer);
        },
        addPools: (state, action: PayloadAction<{ modelId: string, layerIndex: number }>) => {
            const { modelId, layerIndex } = action.payload;
            const model = state[modelId];
            const layerToModify = model.layers[layerIndex] as PoolingLayer;
            layerToModify.pools.push({ id: v4() });
            layerToModify.itemCount++;
        },
        addFilterToConvolution: (state, action: PayloadAction<{ modelId: string, layerId: string }>) => {
            const { modelId, layerId } = action.payload;
            const model = state[modelId];
            const layerToModifyIndex = model.layers.findIndex((el) => el.id === layerId);
            const layerToModify = model.layers[layerToModifyIndex] as ConvolutionLayer;
            layerToModify.filters.push({ id: v4() });
            layerToModify.itemCount++;
            if (model.layers[layerToModifyIndex+1].type === "pooling") {
                const poolingLayerToModify = model.layers[layerToModifyIndex+1] as PoolingLayer;
                poolingLayerToModify.pools.push({ id: v4() });
                poolingLayerToModify.itemCount++;
            }
        },
        removeFilterFromConvolution: (state, action: PayloadAction<{ modelId: string, layerId: string }>) => {
            const { modelId, layerId } = action.payload;
            const model = state[modelId];
            const layerToModifyIndex = model.layers.findIndex((el) => el.id === layerId);
            const layerToModify = model.layers[layerToModifyIndex] as ConvolutionLayer;
            layerToModify.filters.pop();
            layerToModify.itemCount--;
            if (model.layers[layerToModifyIndex+1].type === "pooling") {
                const poolingLayerToModify = model.layers[layerToModifyIndex+1] as PoolingLayer;
                poolingLayerToModify.pools.pop();
                poolingLayerToModify.itemCount--;
            }
        },
        updateStride: (state, action: PayloadAction<{ modelId: string, layerId: string, newStride: number }>) => {
            const { modelId, layerId, newStride } = action.payload;
            const model = state[modelId];
            const layerToModifyIndex = model.layers.findIndex((el) => el.id === layerId);
            const layerToModify = model.layers[layerToModifyIndex] as ConvolutionLayer | PoolingLayer;
            layerToModify.stride = newStride;
        },
        updateFilterSize: (state, action: PayloadAction<{ modelId: string, layerId: string, newFilterSize: number }>) => {
            const { modelId, layerId, newFilterSize } = action.payload;
            const model = state[modelId];
            const layerToModifyIndex = model.layers.findIndex((el) => el.id === layerId);
            const layerToModify = model.layers[layerToModifyIndex] as ConvolutionLayer;
            layerToModify.kernelSize = newFilterSize;
        },
        updatePoolSize: (state, action: PayloadAction<{ modelId: string, layerId: string, newPoolSize: number }>) => {
            const { modelId, layerId, newPoolSize } = action.payload;
            const model = state[modelId];
            const layerToModifyIndex = model.layers.findIndex((el) => el.id === layerId);
            const layerToModify = model.layers[layerToModifyIndex] as PoolingLayer;
            layerToModify.poolSize = newPoolSize;
        },
        updatePadding: (state, action: PayloadAction<{ modelId: string, layerId: string, newPadding: number }>) => {
            const { modelId, layerId, newPadding } = action.payload;
            const model = state[modelId];
            const layerToModifyIndex = model.layers.findIndex((el) => el.id === layerId);
            const layerToModify = model.layers[layerToModifyIndex] as ConvolutionLayer | PoolingLayer;
            layerToModify.padding = newPadding;
        },
        removeHiddenLayer: (state, action: PayloadAction<string>) => {
            const model = state[action.payload];
            model.layers.splice(model.layers.length-2, 1);
        },
        reorderLayers: (state, action: PayloadAction<{ modelId: string, layerToMoveId: string, moveToIndex: number }>) => {
            const { modelId, layerToMoveId, moveToIndex } = action.payload;
            const model = state[modelId];

            const moveFromIndex = model.layers.findIndex((item) => item.id === layerToMoveId);

            if (moveFromIndex === 0 || moveFromIndex === model.layers.length-1) {
                return;
            }

            const layerToMove = model.layers[moveFromIndex];
            layerToMove.order = moveToIndex+1;

            if (moveToIndex < moveFromIndex) {
                model.layers.slice(moveToIndex+1, moveFromIndex).forEach((layer) => {
                    layer.order = layer.order + 1;
                });
                model.layers.splice(moveFromIndex, 1);
                model.layers.splice(moveToIndex + 1, 0, layerToMove);
            } else if (moveToIndex > moveFromIndex) {
                model.layers.slice(moveFromIndex, moveToIndex + 1).forEach((layer) => {
                    layer.order = layer.order - 1;
                });
                model.layers.splice(moveToIndex + 1, 0, layerToMove);
                model.layers.splice(moveFromIndex, 1);
            }
        },
        createModelFromDefault: (state, action: PayloadAction<{ modelId: string, modelName: string }>) => {
            const { modelId, modelName } = action.payload;
            const model: ModelSet = { [modelId]: {
                name: modelName,
                type: "mlp",
                layers: defaultModel["default"].layers,
                parameters: 0,
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
                type: "mlp",
                layers: state[createFrom].layers,
                parameters: 0,
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
        },
        deleteSelectedModel: (state, action: PayloadAction<string>) => {
            // const allModels = {...state};
            // console.log(allModels);
            // delete allModels[action.payload];
            // console.log(allModels);
            // return allModels;
            console.log(`Layer to delete ${action.payload}`);
        }
    }
});

export const {
    removeLayer,
    addNeuronToLayer,
    updateInputLayer,
    updateOutputLayer,
    removeNeuronFromLayer,
    addHiddenLayer,
    addHiddenLayerAfter,
    addConvolutionLayerAfter,
    addPoolingLayerAfter,
    addFilterToConvolution,
    removeFilterFromConvolution,
    updateStride,
    updateFilterSize,
    updatePoolSize,
    addPools,
    updatePadding,
    removeHiddenLayer,
    reorderLayers,
    changeActivation,
    createModelFromDefault,
    createModelFromCurrent,
    updateModelName,
    deleteSelectedModel
} = models.actions;
export default models.reducer;