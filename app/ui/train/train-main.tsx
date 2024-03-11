"use client";

import PlotList from "@/app/ui/train/plot-list";
import Metrics from "@/app/ui/train/metrics";
import ExportModel from "@/app/ui/train/export-model";
import InfoMenu from "@/app/ui/model/info-menu";
import React, { useEffect } from "react";

import { setInfo } from "@/app/lib/redux/features/info-menu-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";

export default function TrainMain() {

    const dispatch = useDispatch<AppDispatch>();
    const currentPlot = useAppSelector((state) => state.infoMenuReducer.itemId);

    useEffect(() => {
        dispatch(setInfo({ infoType: "concept", id: "accuracy" }));
    }, []);

    return (
        <div className="basis-11/12 flex flex-row gap-3 justify-stretch grow">
            <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48 h-full">
                <div className="basis-2/3 bg-white rounded-xl shadow-md h-full border">
                    <PlotList />
                </div>
                <div className="basis-1/3 bg-white rounded-xl shadow-md h-full border">
                    <Metrics />
                </div>
            </div>

            <div className="basis-2/3 bg-white rounded-xl shadow-md grow flex relative border">
                <div className="h-full w-full flex justify-center items-center absolute top-0">
                    {/* <DatasetSample /> */}
                </div>
                <div className="py-5 px-6 text-base z-0 font-bold uppercase">
                    {currentPlot}
                </div>
            </div>

            <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                <div className="basis-1/2 bg-white rounded-xl shadow-md border">
                    <InfoMenu />
                </div>
                <div className="basis-1/2 bg-white rounded-xl shadow-md border">
                    <ExportModel />
                </div>
            </div>
        </div>
    );
}