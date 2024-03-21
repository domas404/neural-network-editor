"use client";

import { updateDataset, updateSelectedTargets } from "@/app/lib/redux/features/dataset-slice";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fetchFilteredData } from "@/app/lib/data";
import _ from "lodash";

export default function TargetList() {

    const targets = useAppSelector((state) => state.datasetReducer.targets);
    const selectedTargets = useAppSelector((state) => state.datasetReducer.selectedTargets);
    const dispatch = useDispatch<AppDispatch>();
    const dataset = useAppSelector((state) => state.datasetReducer);
    const selectedDataset = useAppSelector((state) => state.networkReducer.dataset);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const targetToChange = targets.indexOf(event.currentTarget.value);
        const updatedTargets = selectedTargets.map((target, index) => {
            if (index === targetToChange) {
                return !target;
            } else {
                return target;
            }
        });
        dispatch(updateSelectedTargets(updatedTargets));
    }

    const debouncedRerender = _.debounce(() => {
        async function getFilteredData() {
            const selectedFeatureArray: string[] = dataset.features.filter((item, index) => {
                if (dataset.selectedFeatures[index]) {
                    return item;
                }
            });
            const selectedTargetArray: string[] = targets.filter((item, index) =>{
                if (selectedTargets[index]) {
                    return item;
                }
            });
            const dataRows = await fetchFilteredData(
                selectedDataset,
                dataset.columns.slice(-1).toString(),
                selectedFeatureArray,
                selectedTargetArray
            );
            dispatch(updateDataset(dataRows));
        }
        getFilteredData();
    }, 500);

    useEffect(() => {
        debouncedRerender();
        return () => debouncedRerender.cancel();
    }, [selectedTargets]);

    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="bg-white text-base font-bold uppercase">
                        Targets
                    </div>
                    <div className="uppercase text-gray-500 tracking-wider -mt-2">
                        <span className="text-xs font-bold">
                            {selectedTargets.filter(Boolean).length}/{targets.length}
                        </span>
                        <span className="text-xs font-semibold pl-1">selected</span>
                    </div>
                    <div className="flex flex-col gap-px text-sm text-justify leading-5 hyphens-auto bg-gray-200 max-h-48 overflow-scroll">
                        {
                            targets.map((target, index) => {
                                return (
                                    <div key={target} className="bg-white py-2">
                                        <input
                                            id={target}
                                            type="checkbox"
                                            name="targets"
                                            className="mr-2"
                                            value={target}
                                            checked={selectedTargets[index]}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor={target} className="hover:cursor-pointer">{target}</label>
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
