"use client";

import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { updateSelectedFeatures, updateDataset } from "@/app/lib/redux/features/dataset-slice";
import { useDispatch } from "react-redux";
import { fetchFilteredData } from "@/app/lib/data";
import React, { useEffect, useState } from "react";
import _ from 'lodash';
import allDatasets from "@/app/lib/all-datasets";

export default function FeatureList() {

    // const features = useAppSelector((state) => state.datasetReducer.features);
    // const selectedFeatures = useAppSelector((state) => state.datasetReducer.selectedFeatures);
    const dataset = useAppSelector((state) => state.datasetReducer);
    const dispatch = useDispatch<AppDispatch>();
    const datasetId = useAppSelector((state) => state.networkReducer.dataset);
    const [selectedDataset, setSelectedDataset] = useState(dataset[allDatasets[0].id]);

    useEffect(() => {
        setSelectedDataset(dataset[datasetId]);
    }, [dataset]);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const featureToChange = selectedDataset.features.indexOf(event.currentTarget.value);
        const updatedFeatures = selectedDataset.selectedFeatures.map((feature, index) => {
            if (index === featureToChange) {
                return !feature;
            } else {
                return feature;
            }
        });
        dispatch(updateSelectedFeatures({ datasetName: datasetId,  selectedFeatures: updatedFeatures }));
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
    }, [selectedDataset.selectedFeatures]);

    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="bg-white text-base font-bold uppercase">
                        Features
                    </div>
                    <div className="uppercase text-gray-500 tracking-wider -mt-2">
                        <span className="text-xs font-bold">
                            {selectedDataset.selectedFeatures.filter(Boolean).length}/{selectedDataset.features.length}
                        </span>
                        <span className="text-xs font-semibold pl-1">selected</span>
                    </div>
                    <div className="flex flex-col gap-px text-sm text-justify leading-5 hyphens-auto bg-gray-200 max-h-48 overflow-scroll">
                        {
                            selectedDataset.features.map((feature, index) => {
                                return (
                                    <div key={feature} className="bg-white py-2">
                                        <input
                                            id={feature}
                                            type="checkbox"
                                            name="features"
                                            className="mr-2"
                                            value={feature}
                                            checked={selectedDataset.selectedFeatures[index]}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor={feature} className="hover:cursor-pointer">{feature}</label>
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
