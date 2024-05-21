import "@/app/globalicons.css";
import Param from "@/app/ui/misc/param-box";
import React, { useState, useEffect } from 'react';

import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { addNeuronToLayer, removeNeuronFromLayer, changeActivation, updatePadding, updateStride, updatePoolSize, changePoolType } from "@/app/lib/redux/features/model-slice";
import { useDispatch } from "react-redux";
import { PoolingLayer } from "@/app/lib/data-types";

const MAX_STRIDE = 12;
const MIN_STRIDE = 1;

const MAX_POOL_SIZE = 12;
const MIN_POOL_SIZE = 2;

const MIN_PADDING = 0;
const MAX_PADDING = 5;

export default function PoolingInfo() {

    const dispatch = useDispatch<AppDispatch>();
    const { itemId } = useAppSelector((state) => state.infoMenuReducer);
    const modelId = useAppSelector((state) => state.networkReducer.modelId);
    const objects = useAppSelector((state) => state.modelsReducer[modelId].layers);
    const selectedObject = objects.find(el => el.id === itemId) as PoolingLayer;
    // const previousLayerIndex = objects.findIndex(el => el.order === selectedObject.order-1);

    const [poolSize, setPoolSize] = useState(MIN_POOL_SIZE);
    const [stride, setStride] = useState(MIN_POOL_SIZE);
    const [padding, setPadding] = useState(MIN_PADDING);
    const depth = selectedObject?.depth;

    const handleChange = (paramType: string, value: string) => {
        dispatch(changePoolType({ modelId: modelId, layerId: itemId, poolType: value }));
    }

    const increasePoolSize = () => {
        if (poolSize < MAX_POOL_SIZE){
            const newPoolSize = poolSize+1;
            setPoolSize(newPoolSize);
            dispatch(updatePoolSize({ modelId: modelId, layerId: itemId, newPoolSize: newPoolSize }));
        }
    }

    const decreasePoolSize = () => {
        if (poolSize > MIN_POOL_SIZE){
            const newPoolSize = poolSize-1;
            setPoolSize(newPoolSize);
            dispatch(updatePoolSize({ modelId: modelId, layerId: itemId, newPoolSize: newPoolSize }));
        }
    }

    const increaseStride = () => {
        if (stride < MAX_STRIDE){
            const newStride = stride+1;
            setStride(newStride);
            dispatch(updateStride({ modelId: modelId, layerId: itemId, newStride: newStride }));
        }
    }

    const decreaseStride = () => {
        if (stride > MIN_STRIDE){
            const newStride = stride-1;
            setStride(newStride);
            dispatch(updateStride({ modelId: modelId, layerId: itemId, newStride: newStride }));
        }
    }

    const increasePadding = () => {
        if (padding < MAX_PADDING){
            const newPadding = padding+1;
            setPadding(newPadding);
            dispatch(updatePadding({ modelId: modelId, layerId: itemId, newPadding: newPadding }));
        }
    }

    const decreasePadding = () => {
        if (padding > MIN_PADDING){
            const newPadding = padding-1;
            setPadding(newPadding);
            dispatch(updatePadding({ modelId: modelId, layerId: itemId, newPadding: newPadding }));
        }
    }

    useEffect(() => {
        if(selectedObject !== undefined) {
            setStride(selectedObject.stride as number);
            setPoolSize(selectedObject.poolSize as number);
            setPadding(selectedObject.padding)
        }
    }, [selectedObject]);

    return (
        <>
            {
                selectedObject &&
                <>
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        {`${selectedObject?.type} layer ${selectedObject?.type === "hidden" ? selectedObject?.order : ""}`}
                    </div>
                    <div className="text-sm text-justify leading-5 mt-2 hyphens-auto scrollable-info-menu overflow-y-auto">
                        <div>
                            <div className="mt-2 text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1 dark:text-slate-200">
                                Pool size
                            </div>
                            <div className="bg-gray-50 border py-2.5 w-32 px-2 text-sm rounded-lg h-10 flex flex-row items-center justify-between
                                dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                <div className="basis-2/5 h-full justify-center flex items-end">
                                    <span>{poolSize}</span>
                                    <span className="material-symbols-outlined md-16">close</span>
                                    <span>{poolSize}</span>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        onClick={increasePoolSize}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            text-gray-600 dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            add
                                        </span>
                                    </button>
                                    <button
                                        onClick={decreasePoolSize}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            text-gray-600 dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            remove
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="mt-2 text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1 dark:text-slate-200">
                                Stride
                            </div>
                            <div className="bg-gray-50 border py-2.5 px-2 w-28 text-sm rounded-lg h-10 flex flex-row items-center justify-between
                                dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                <div className="basis-2/5 h-full text-center">
                                    <span>{stride}</span>
                                </div>
                                <div className="flex basis-3/5 justify-center">
                                    <button
                                        onClick={increaseStride}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            text-gray-600 dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            add
                                        </span>
                                    </button>
                                    <button
                                        onClick={decreaseStride}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            text-gray-600 dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            remove
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="mt-6">
                            <div className="mt-2 text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1 dark:text-slate-200">
                                Depth
                            </div>
                            <div className="bg-gray-50 border py-2.5 px-2 w-12 text-sm rounded-lg h-10 flex flex-row items-center justify-between
                                dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                <div className="w-10 h-full text-center">
                                    <span>{depth}</span>
                                </div>
                            </div>
                        </div> */}
                        <div>
                            <div className="mt-2 text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1 dark:text-slate-200">
                                Padding
                            </div>
                            <div className="bg-gray-50 border py-2.5 w-28 px-2 text-sm rounded-lg h-10 flex flex-row items-center justify-between
                                dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                <div className="basis-2/5 h-full text-center">
                                    <span>{padding}</span>
                                </div>
                                <div className="flex basis-3/5 justify-center">
                                    <button
                                        onClick={increasePadding}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            text-gray-600 dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            add
                                        </span>
                                    </button>
                                    <button
                                        onClick={decreasePadding}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            text-gray-600 dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            remove
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            selectedObject?.type !== "input" &&
                            <Param
                                handleChange={handleChange}
                                paramType={"pool type"}
                                paramName={"pool type"}
                                paramOptions={["max", "average"]}
                                currentValue={selectedObject?.poolType}
                            />
                        }
                    </div>
                </>
            }
        </>
    );
}
