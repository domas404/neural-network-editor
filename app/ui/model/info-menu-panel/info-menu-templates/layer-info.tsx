import "@/app/globalicons.css";
import Param from "@/app/ui/misc/param-box";
import React, { useState, useEffect } from 'react';

import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { addNeuronToLayer, removeNeuronFromLayer, changeActivation } from "@/app/lib/redux/features/model-slice";
import { useDispatch } from "react-redux";

const MAX_NEURON_COUNT = 12;
const MIN_NEURON_COUNT = 1;

export default function LayerInfo() {

    const dispatch = useDispatch<AppDispatch>();
    const { itemId } = useAppSelector((state) => state.infoMenuReducer);
    const modelId = useAppSelector((state) => state.networkReducer.modelId);
    const objects = useAppSelector((state) => state.modelsReducer[modelId].layers);
    const selectedObject = objects.find(el => el.id === itemId);
    const [neuronCount, setNeuronCount] = useState(MIN_NEURON_COUNT);

    const handleChange = (paramType: string, value: string) => {
        dispatch(changeActivation({ modelName: modelId, layerId: itemId, activation: value }));
    }

    const addNeuron = () => {
        if (neuronCount < MAX_NEURON_COUNT){
            dispatch(addNeuronToLayer({ modelName: modelId, layerId: itemId }));
        }
    }

    const removeNeuron = () => {
        if (neuronCount > MIN_NEURON_COUNT){
            dispatch(removeNeuronFromLayer({ modelName: modelId, layerId: itemId }));
        }
    }

    useEffect(() => {
        const newNeuronCount = selectedObject === undefined ? 1 : selectedObject!.neurons.length;
        setNeuronCount(newNeuronCount);
    }, [selectedObject]);

    return (
        <>
            {
                selectedObject &&
                <>
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        {`${selectedObject?.type} layer ${selectedObject?.type === "hidden" ? selectedObject?.order : ""}`}
                    </div>
                    <div className="text-sm text-justify leading-5 mt-2 hyphens-auto">
                        {
                            selectedObject?.type !== "input" &&
                            <Param
                                handleChange={handleChange}
                                paramType={"activation"}
                                paramName={"activation"}
                                paramOptions={["sigmoid", "tanh", "relu", "softmax", "linear"]}
                                currentValue={selectedObject?.activation}
                            />
                        }
                        <div>
                            <div className="mt-2 text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1 dark:text-slate-200">
                                Neurons
                            </div>
                            <div className="bg-gray-50 border py-2.5 w-28 px-2 text-sm rounded-lg h-10 flex flex-row items-center justify-between
                                dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                <div className="basis-2/5 h-full text-center">
                                    <span>{neuronCount}</span>
                                </div>
                                <div className="flex basis-3/5 justify-center">
                                    <button
                                        onClick={addNeuron}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            ${selectedObject?.type === "hidden" ? "text-gray-600 dark:text-slate-200" : "text-gray-300 dark:text-gray-500 pointer-events-none"}
                                            dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            add
                                        </span>
                                    </button>
                                    <button
                                        onClick={removeNeuron}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            ${selectedObject?.type === "hidden" ? "text-gray-600 dark:text-slate-200" : "text-gray-300 dark:text-gray-500 pointer-events-none"}
                                            dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            remove
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}
