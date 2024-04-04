import "@/app/globalicons.css";
import React, { useState, useEffect } from 'react';

import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { addHiddenLayer, removeHiddenLayer, updateModelName } from "@/app/lib/redux/features/model-slice";
import { useDispatch } from "react-redux";

const MAX_LAYER_COUNT = 8;
const MIN_LAYER_COUNT = 1;

function useModelRename(modelId: string, selectedModelName: string) {
    const [inputMode, setInputMode] = useState(false);
    const [modelName, setModelName] = useState(selectedModelName);
    const dispatch = useDispatch<AppDispatch>();

    const toggleInputMode = () => {
        setInputMode(!inputMode);
    }

    const changeModelName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModelName(event.currentTarget.value);
    }

    const updateModel = () => {
        dispatch(updateModelName({ modelId: modelId, newName: modelName }));
        toggleInputMode();
    }

    const updateModelOnKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            dispatch(updateModelName({ modelId: modelId, newName: modelName }));
            toggleInputMode();
        }
    }

    useEffect(() => {
        setModelName(selectedModelName);
    }, [selectedModelName]);

    return [inputMode, toggleInputMode, modelName, changeModelName, updateModel, updateModelOnKeypress] as const;
}

export default function DefaultInfo() {

    const dispatch = useDispatch<AppDispatch>();
    const modelId = useAppSelector((state) => state.networkReducer.modelId);
    const allModels = useAppSelector((state) => state.modelsReducer);
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
        const newNeuronCount = allModels[modelId].layers.length-2;
        setLayerCount(newNeuronCount);
    }, [allModels[modelId].layers]);

    const [inputMode, toggleInputMode, modelName, changeModelName, updateModel, updateModelOnKeypress] = useModelRename(modelId, allModels[modelId].name);

    return (
        <div className="">
            <div className="flex justify-between">
                <div className="w-full text-base font-bold uppercase dark:text-teal-100 flex flex-row gap-2 items-center">
                    {
                        inputMode
                        ?
                            <input
                                type="text"
                                className="w-4/5 outline-none border-b-2 border-slate-300 focus:border-lightblue-400
                                    dark:bg-slate-800 dark:border-slate-500"
                                autoFocus
                                defaultValue={modelName}
                                onChange={changeModelName}
                                onKeyDown={updateModelOnKeypress}
                            />
                        :
                            <div className="w-4/5 text-ellipsis overflow-hidden text-nowrap" title={modelName}>{modelName}</div>
                    }
                </div>
                {
                    inputMode
                    ?
                        <div className="absolute ml-1 right-4 top-4 flex p-[6px] rounded-full select-none hover:cursor-pointer
                            hover:bg-slate-200 active:bg-lightblue-200 transition-all ease-in-out duration-200
                            text-slate-400 hover:text-slate-700 dark:text-slate-500
                            dark:hover:bg-slate-700 dark:hover:text-slate-300 dark:active:bg-slate-600"
                            onClick={updateModel}
                        >
                            <span className="material-symbols-outlined md-20">
                                done
                            </span>
                        </div>
                    :
                        <div className="absolute ml-1 right-4 top-4 flex p-[6px] rounded-full select-none hover:cursor-pointer
                            hover:bg-slate-200 active:bg-lightblue-200 transition-all ease-in-out duration-200
                            text-slate-400 hover:text-slate-700 dark:text-slate-500
                            dark:hover:bg-slate-700 dark:hover:text-slate-300 dark:active:bg-slate-600"
                            onClick={toggleInputMode}
                            title="edit name"
                        >
                            <span className="material-symbols-outlined md-20">
                                edit
                            </span>
                        </div>
                }
            </div>
            <div className="mt-4">
                <div className="text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1 dark:text-slate-200">
                    Hidden layers
                </div>
                <div className="bg-gray-50 border py-2.5 w-28 px-2 text-sm rounded-lg h-10 flex flex-row items-center justify-between
                    dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                    <div className="basis-2/5 h-full text-center">
                        <span>{layerCount}</span>
                    </div>
                    <div className="flex basis-3/5 justify-center">
                        <button
                            onClick={addLayer}
                            className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                            <span className="material-symbols-outlined md-20">
                                add
                            </span>
                        </button>
                        <button
                            onClick={removeLayer}
                            className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
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
