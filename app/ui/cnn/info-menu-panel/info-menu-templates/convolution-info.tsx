import "@/app/globalicons.css";
import Param from "@/app/ui/misc/param-box";
import React, { useState, useEffect } from 'react';

import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { changeActivation, removeFilterFromConvolution, addFilterToConvolution, updateFilterSize, updateStride, updatePadding } from "@/app/lib/redux/features/model-slice";
import { useDispatch } from "react-redux";
import { ConvolutionLayer } from "@/app/lib/data-types";

const MIN_STRIDE = 1;
const MAX_STRIDE = 5;

const MIN_FILTER_SIZE = 2;
const MAX_FILTER_SIZE = 12;

const MIN_FILTER_COUNT = 1;
const MAX_FILTER_COUNT = 12;

const MIN_PADDING = 0;
const MAX_PADDING = 5;

export default function ConvolutionInfo() {

    const dispatch = useDispatch<AppDispatch>();
    const { itemId } = useAppSelector((state) => state.infoMenuReducer);
    const modelId = useAppSelector((state) => state.networkReducer.modelId);
    const objects = useAppSelector((state) => state.modelsReducer[modelId].layers);
    const selectedObject = objects.find(el => el.id === itemId) as ConvolutionLayer;
    // const [neuronCount, setNeuronCount] = useState(MIN_NEURON_COUNT);

    const handleChange = (paramType: string, value: string) => {
        dispatch(changeActivation({ modelName: modelId, layerId: itemId, activation: value }));
    }

    const [filterSize, setFilterSize] = useState(MIN_FILTER_SIZE);
    const [stride, setStride] = useState(MIN_STRIDE);
    const [filterCount, setFilterCount] = useState(MIN_FILTER_COUNT);
    const [padding, setPadding] = useState(MIN_PADDING);
    const depth = selectedObject?.depth;

    const increaseFilterSize = () => {
        if (filterSize < MAX_FILTER_SIZE){
            const newFilterSize = filterSize+1;
            setFilterSize(newFilterSize);
            dispatch(updateFilterSize({ modelId: modelId, layerId: itemId, newFilterSize: newFilterSize }));
        }
    }

    const decreaseFilterSize = () => {
        if (filterSize > MIN_FILTER_SIZE){
            const newFilterSize = filterSize-1;
            setFilterSize(newFilterSize);
            dispatch(updateFilterSize({ modelId: modelId, layerId: itemId, newFilterSize: newFilterSize }));
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

    const increaseFilterCount = () => {
        if (filterCount < MAX_FILTER_COUNT){
            setFilterCount(filterCount+1);
            dispatch(addFilterToConvolution({ modelId: modelId, layerId: itemId }));
        }
    }

    const decreaseFilterCount = () => {
        if (filterCount > MIN_FILTER_COUNT){
            setFilterCount(filterCount-1);
            dispatch(removeFilterFromConvolution({ modelId: modelId, layerId: itemId }));
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
        if (padding < MAX_PADDING){
            const newPadding = padding-1;
            setPadding(newPadding);
            dispatch(updatePadding({ modelId: modelId, layerId: itemId, newPadding: newPadding }));
        }
    }

    useEffect(() => {
        if(selectedObject !== undefined) {
            setFilterCount(selectedObject.itemCount);
            setStride(selectedObject.stride as number);
            setFilterSize(selectedObject.kernelSize as number);
            setPadding(selectedObject.padding)
        }
    }, [selectedObject]);

    return (
        <>
            {
                selectedObject &&
                <>
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        {`${selectedObject?.type} (${selectedObject?.order})`}
                    </div>
                    <div className="text-sm text-justify leading-5 mt-2 hyphens-auto scrollable-info-menu overflow-y-auto">
                        <div className="">
                            <div className="mt-2 text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1 dark:text-slate-200">
                                Filter Count
                            </div>
                            <div className="bg-gray-50 border py-2.5 w-28 px-2 text-sm rounded-lg h-10 flex flex-row items-center justify-between
                                dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                <div className="basis-2/5 h-full text-center">
                                    <span>{filterCount}</span>
                                </div>
                                <div className="flex basis-3/5 justify-center">
                                    <button
                                        onClick={increaseFilterCount}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            text-gray-600 dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            add
                                        </span>
                                    </button>
                                    <button
                                        onClick={decreaseFilterCount}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            text-gray-600 dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            remove
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mt-2 text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1 dark:text-slate-200">
                                Filter size
                            </div>
                            <div className="bg-gray-50 border py-2.5 w-32 px-2 text-sm rounded-lg h-10 flex flex-row items-center justify-between
                                dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                                <div className="basis-2/5 h-full justify-center flex items-end">
                                    <span>{filterSize}</span>
                                    <span className="material-symbols-outlined md-16">close</span>
                                    <span>{filterSize}</span>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        onClick={increaseFilterSize}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            text-gray-600 dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            add
                                        </span>
                                    </button>
                                    <button
                                        onClick={decreaseFilterSize}
                                        className={`select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200
                                            text-gray-600 dark:text-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-500`}>
                                        <span className="material-symbols-outlined md-20">
                                            remove
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mt-2 text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1 dark:text-slate-200">
                                Stride
                            </div>
                            <div className="bg-gray-50 border py-2.5 w-28 px-2 text-sm rounded-lg h-10 flex flex-row items-center justify-between
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
                                paramType={"activation"}
                                paramName={"activation"}
                                paramOptions={["sigmoid", "tanh", "relu", "softmax", "linear"]}
                                currentValue={selectedObject?.activation}
                            />
                        }
                    </div>
                </>
            }
        </>
    );
}
