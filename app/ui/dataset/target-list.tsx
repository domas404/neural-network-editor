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
    }, 500);

    useEffect(() => {
        debouncedRerender();
        return () => debouncedRerender.cancel();
    }, [selectedDataset.selectedLabels]);

    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="bg-white text-base font-bold uppercase">
                        Targets
                    </div>
                    <div className="uppercase text-gray-500 tracking-wider -mt-2">
                        <span className="text-xs font-bold">
                            {selectedDataset.selectedLabels.filter(Boolean).length}/{selectedDataset.labels.length}
                        </span>
                        <span className="text-xs font-semibold pl-1">selected</span>
                    </div>
                    <div className="flex flex-col gap-px text-sm text-justify leading-5 hyphens-auto bg-gray-200 max-h-48 overflow-scroll">
                        {
                            selectedDataset.labels.map((label, index) => {
                                return (
                                    <div key={label} className="bg-white py-2">
                                        <input
                                            id={label}
                                            type="checkbox"
                                            name="targets"
                                            className="mr-2"
                                            value={label}
                                            checked={selectedDataset.selectedLabels[index]}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor={label} className="hover:cursor-pointer">{label}</label>
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
