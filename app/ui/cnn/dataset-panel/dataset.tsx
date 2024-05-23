"use client";

import "@/app/globalicons.css";
import Link from "next/link";
import { RadioOption } from "@/app/ui/misc/list-options";

import { changeDataset } from "@/app/lib/redux/features/network-slice";
import { uploadDataset } from "@/app/lib/redux/features/dataset-slice";
import { fetchAllData } from '@/app/lib/data';
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { DatasetPanelSkeleton, DatasetSkeleton } from "../../misc/skeletons";
import allDatasets from "@/app/lib/all-datasets";

import React, { useEffect, useState } from "react";
import { ShuffleData } from "@/app/lib/train-model/build-model";

export default function Dataset() {

    const dispatch = useDispatch<AppDispatch>();
    const dataset = useAppSelector((state) => state.datasetReducer);
    const selectedDataset = useAppSelector((state) => state.networkReducer.dataset);

    const [datasetLoaded, setDatasetLoaded] = useState(false);

    useEffect(() => {
        async function initDataset() {
            // console.log(`dataset loader called for ${selectedDataset} at 'model'`);
            const [dataRows, labels] = await fetchAllData(selectedDataset);
            dispatch(uploadDataset({ datasetName: selectedDataset, dataRows: dataRows, labels: labels}));
            setDatasetLoaded(true);
        }
        if (!dataset[selectedDataset].loaded) {
            if (dataset[selectedDataset].type === "tabular") {
                initDataset();
            }
        } else if (!datasetLoaded) {
            setDatasetLoaded(true);
        }
    }, [selectedDataset]);


    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value);
        dispatch(changeDataset(event.currentTarget.value));
    }

    return (
        <>
            {
                !datasetLoaded ?
                    <DatasetSkeleton />
                :
                <div className="bg-white flex shadow-sm rounded-md border h-full dark:bg-slate-800 dark:border-slate-700">
                    <div className="py-5 px-6 w-full relative">
                        <div className="flex justify-between">
                            <div className="text-base font-bold uppercase dark:text-teal-100">
                                Dataset
                            </div>
                            <Link
                                href="/cnn/data"
                                className="absolute right-4 top-4 flex p-1 rounded-full select-none hover:cursor-pointer
                                    hover:bg-slate-200 active:bg-lightblue-200 transition-all ease-in-out duration-200
                                    dark:hover:bg-slate-700 dark:active:bg-slate-600"
                                title="view dataset"
                            >
                                <span className="material-symbols-outlined text-slate-600 dark:text-slate-100">
                                    arrow_right_alt
                                </span>
                            </Link>
                        </div>
                        <div className="overflow-x-scroll flex flex-row h-14 items-center gap-2 overflow-y-hidden">
                            <RadioOption
                                key={"mnist"}
                                id={"mnist"}
                                handleChange={handleChange}
                                isChecked={true}
                                name={"MNIST"}
                                groupName="dataset"
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
