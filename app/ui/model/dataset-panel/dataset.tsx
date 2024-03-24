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

export default function Dataset() {

    const dispatch = useDispatch<AppDispatch>();
    const dataset = useAppSelector((state) => state.datasetReducer);
    const selectedDataset = useAppSelector((state) => state.networkReducer.dataset);

    const [datasetLoaded, setDatasetLoaded] = useState(false);

    useEffect(() => {
        async function initDataset() {
            console.log(`dataset loader called for ${selectedDataset}`);
            const [dataRows, labels] = await fetchAllData(selectedDataset);
            dispatch(uploadDataset({ datasetName: selectedDataset, dataRows: dataRows, labels: labels}));            
            setDatasetLoaded(true);
        }
        if (!dataset[selectedDataset].loaded) {
            initDataset();
        } else if (!datasetLoaded) {
            setDatasetLoaded(true);
        }
    }, [selectedDataset]);


    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        dispatch(changeDataset(event.currentTarget.value));
    }

    return (
        <>
            {
                !datasetLoaded ?
                    <DatasetSkeleton />
                :
                <div className="bg-white flex shadow-sm rounded-md border h-full dark:bg-slate-800 dark:border-slate-700">
                    <div className="py-5 px-6 w-full">
                        <div className="flex justify-between">
                            <div className="text-base font-bold uppercase dark:text-teal-100">
                                Dataset
                            </div>
                            <Link href="/model/data" className="select-none hover:cursor-pointer text-gray-400 hover:text-gray-500 active:text-gray-600">
                                <span className="material-symbols-outlined dark:text-slate-100">
                                    arrow_right_alt
                                </span>
                            </Link>
                        </div>
                        <div className="overflow-x-scroll flex flex-row h-14 items-center gap-2">
                            {
                                allDatasets.map((item) => {
                                    return (
                                        <RadioOption
                                            key={item.id}
                                            id={item.id}
                                            handleChange={handleChange}
                                            isChecked={item.id === selectedDataset}
                                            name={item.name}
                                            groupName="dataset"
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
