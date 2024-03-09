"use client";

import DatasetList from '@/app/ui/dataset/dataset-list';
import TargetList from "@/app/ui/dataset/target-list";
import FeatureList from "@/app/ui/dataset/feature-list";
import DatasetSample from "@/app/ui/dataset/dataset-sample";

import React, { useEffect } from "react";

import { uploadDataset, setTargets } from "@/app/lib/redux/features/dataset-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { initializeDataset, initializeTargets } from '@/app/lib/modify-dataset';

export default function DatasetMain() {

    const dispatch = useDispatch<AppDispatch>();
    const dataset = useAppSelector((state) => state.datasetReducer.dataset);

    useEffect(() => {
        async function initDataset() {
            const data = await initializeDataset();
            console.log(data);
            dispatch(uploadDataset(data));

            const targets = await initializeTargets();
            console.log(targets);
            dispatch(setTargets(targets));
        }

        if (Object.keys(dataset[0]).length === 0) {
            initDataset();
        }
    }, []);

    return (
        <div className="basis-11/12 flex flex-row gap-3 justify-stretch grow">
            <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48 h-full">
                <div className="bg-white rounded-xl shadow-md h-full border">
                    <DatasetList />
                </div>
            </div>

            <div className="basis-2/3 bg-white rounded-xl shadow-md grow flex relative border">
                <div className="h-full w-full flex justify-center items-center absolute top-0">
                    <DatasetSample />
                </div>
                <div className="py-5 px-6 text-base z-0 font-bold uppercase">
                    Iris data
                </div>
            </div>

            <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                <div className="basis-1/2 bg-white rounded-xl shadow-md border">
                    <FeatureList />
                </div>
                <div className="basis-1/2 bg-white rounded-xl shadow-md border">
                    <TargetList />
                </div>
            </div>
        </div>
    );
}