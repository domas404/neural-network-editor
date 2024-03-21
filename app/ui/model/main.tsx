"use client";

import Dataset from '@/app/ui/model/dataset-panel/dataset';
import Parameters from "@/app/ui/model/hyperparameter-panel/parameters";
import Models from "@/app/ui/model/model-panel/models";
import InfoMenu from "@/app/ui/model/info-menu-panel/info-menu";
import Layers from "@/app/ui/model/layers-panel/layers";
import Playground from "@/app/ui/model/playground/playground";
import TrainButton from "@/app/ui/model/train-button";

import React, { useEffect } from "react";

import { uploadDataset } from "@/app/lib/redux/features/dataset-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { fetchAllData } from '@/app/lib/data';

export default function Home() {

    const dispatch = useDispatch<AppDispatch>();
    const dataset = useAppSelector((state) => state.datasetReducer.dataset);
    const selectedDataset = useAppSelector((state) => state.networkReducer.dataset);

    useEffect(() => {
        async function initDataset() {
            const [dataRows, labels] = await fetchAllData(selectedDataset);
            dispatch(uploadDataset({ dataRows: dataRows, labels: labels}));            
        }
        if (Object.keys(dataset[0]).length === 0) {
            initDataset();
        }
    }, []);

    return (
        <div className="basis-11/12 flex flex-row gap-2 justify-stretch grow">
            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                <div className="basis-1/6 bg-white rounded-lg shadow-xs border">
                    <Dataset />
                </div>
                <div className="basis-2/3 bg-white rounded-lg shadow-xs border">
                    <Parameters />
                </div>
                <div className="basis-1/6 bg-white rounded-lg shadow-xs border">
                    <Models />
                </div>
            </div>
            <div className="basis-2/3 bg-white rounded-lg shadow-xs grow border">
                <Playground />
            </div>
            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                <div className="basis-1/2 bg-white rounded-lg shadow-xs border">
                    <InfoMenu />
                </div>
                <div className="basis-5/12 bg-white rounded-lg shadow-xs grow border">
                    <Layers />
                </div>
                <TrainButton />
            </div>
        </div>
    );
}
