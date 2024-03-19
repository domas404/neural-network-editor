import "@/app/globalicons.css";
import React, { useState, useEffect } from 'react';

import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { addHiddenLayer, removeHiddenLayer } from "@/app/lib/redux/features/model-slice";
import { useDispatch } from "react-redux";

const MAX_LAYER_COUNT = 8;
const MIN_LAYER_COUNT = 1;

export default function DefaultInfo() {

    const dispatch = useDispatch<AppDispatch>();
    const modelId = useAppSelector((state) => state.networkReducer.modelId);
    const objects = useAppSelector((state) => state.modelsReducer[modelId].layers);
    const [layerCount, setLayerCount] = useState(MIN_LAYER_COUNT);

    const addLayer = () => {
        if (layerCount < MAX_LAYER_COUNT){
            dispatch(addHiddenLayer(modelId));
        }
    }

    const removeLayer = () => {
        if (layerCount > MIN_LAYER_COUNT){
            dispatch(removeHiddenLayer(modelId));
        }
    }

    useEffect(() => {
        const newNeuronCount = objects.length-2;
        setLayerCount(newNeuronCount);
    }, [objects]);

    return (
        <div>
            <div className="bg-white text-base font-bold uppercase">
                Network
            </div>
            <div className="mt-4">
                <div className="text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1">
                    Hidden layers
                </div>
                <div className="bg-gray-50 border py-2.5 w-28 px-2 text-sm rounded-lg h-10 flex flex-row items-center justify-between">
                    <div className="basis-2/5 h-full text-center">
                        <span>{layerCount}</span>
                    </div>
                    <div className="flex basis-3/5 justify-center">
                        <button
                            onClick={addLayer}
                            className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200`}>
                            <span className="material-symbols-outlined md-20">
                                add
                            </span>
                        </button>
                        <button
                            onClick={removeLayer}
                            className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200`}>
                            <span className="material-symbols-outlined md-20">
                                remove
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
