"use client";

import { updateDataset, updateSelectedLabels } from "@/app/lib/redux/features/dataset-slice";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchFilteredData } from "@/app/lib/data";
import _ from "lodash";
import allDatasets from "@/app/lib/all-datasets";

export default function TargetList() {

    // const targets = useAppSelector((state) => state.datasetReducer.targets);
    // const selectedTargets = useAppSelector((state) => state.datasetReducer.selectedTargets);
    const dispatch = useDispatch<AppDispatch>();
    const dataset = useAppSelector((state) => state.datasetReducer);
    const datasetId = useAppSelector((state) => state.networkReducer.dataset);
    const [selectedDataset, setSelectedDataset] = useState(dataset[allDatasets[0].id]);

    useEffect(() => {
        setSelectedDataset(dataset[datasetId]);
    }, [dataset]);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const labelToChange = selectedDataset.labels.indexOf(event.currentTarget.value);
        const updatedTargets = selectedDataset.selectedLabels.map((label, index) => {
            if (index === labelToChange) {
                return !label;
            } else {
                return label;
            }
        });
        dispatch(updateSelectedLabels({ datasetName: datasetId, selectedLabels: updatedTargets }));
    }

    const debouncedRerender = _.debounce(() => {
        async function getFilteredData() {
            const selectedFeatureArray: string[] = selectedDataset.features.filter((item, index) => {
                if (selectedDataset.selectedFeatures[index]) {
                    return item;
                }
            });
            const selectedLabelArray: string[] = selectedDataset.labels.filter((item, index) =>{
                if (selectedDataset.selectedLabels[index]) {
                    return item;
                }
            });
            const dataRows = await fetchFilteredData(
                datasetId,
                selectedDataset.columns.slice(-1).toString(),
                selectedFeatureArray,
                selectedLabelArray
            );
            dispatch(updateDataset({ datasetName: datasetId, updatedRows: dataRows }));
        }
        getFilteredData();
    }, 1000);

    useEffect(() => {
        debouncedRerender();
        return () => debouncedRerender.cancel();
    }, [selectedDataset.selectedLabels]);

    return (
        <div className="flex rounded-md shadow-sm h-full border bg-white dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        Targets
                    </div>
                    <div className="uppercase text-gray-500 tracking-wider -mt-2 dark:text-slate-200">
                        <span className="text-xs font-bold">
                            {selectedDataset.selectedLabels.filter(Boolean).length}/{selectedDataset.labels.length}
                        </span>
                        <span className="text-xs font-semibold pl-1">selected</span>
                    </div>
                    <div className="flex flex-col gap-px text-sm text-justify leading-5 hyphens-auto bg-gray-200 max-h-48 dark:bg-slate-700">
                        {
                            selectedDataset.labels.map((label, index) => {
                                return (
                                    <div key={label} className="bg-white py-2 dark:bg-slate-800  dark:text-white flex items-center gap-2">
                                        <input
                                            id={label}
                                            type="checkbox"
                                            name="targets"
                                            className="appearance-none w-5 h-5 border rounded-full peer
                                            bg-slate-50 border-slate-300
                                            hover:border-slate-400 hover:cursor-pointer
                                            active:border-slate-500
                                            checked:bg-sky-600 checked:border-sky-600
                                            checked:hover:opacity-80 checked:hover:border-sky-600
                                            checked:active:opacity-70
                                            dark:bg-slate-700 dark:border-slate-600 dark:hover:border-slate-500
                                            dark:active:border-slate-400"
                                            value={label}
                                            checked={selectedDataset.selectedLabels[index]}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor={label} className="hover:cursor-pointer
                                            text-slate-600 peer-checked:text-black peer-hover:text-black
                                            dark:text-slate-300 dark:peer-checked:text-white dark:peer-hover:text-white"
                                        >
                                            {label}
                                        </label>
                                        <span className="material-symbols-outlined md-20 absolute pointer-events-none
                                            text-slate-200 peer-hover:text-slate-300
                                            peer-active:text-slate-400
                                            peer-checked:text-white peer-checked:peer-hover:text-white
                                            dark:text-slate-500 dark:peer-hover:text-slate-400 dark:peer-active:text-slate-300">
                                            check
                                        </span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
