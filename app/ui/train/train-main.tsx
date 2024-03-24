"use client";

import PlotList from "@/app/ui/train/plot-list";
import Metrics from "@/app/ui/train/metrics";
import ExportModel from "@/app/ui/train/export-model";
import InfoMenu from "@/app/ui/model/info-menu-panel/info-menu";
import React, { useEffect } from "react";

import { setInfo } from "@/app/lib/redux/features/info-menu-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import PlotMain from "@/app/ui/train/plot-main";

export default function TrainMain() {

    const dispatch = useDispatch<AppDispatch>();
    const currentPlot = useAppSelector((state) => state.infoMenuReducer.itemId);

    useEffect(() => {
        dispatch(setInfo({ infoType: "concept", id: "accuracy" }));
    }, []);

    return (
        <div className="basis-11/12 flex flex-row gap-2 justify-stretch grow">
            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48 h-full">
                <div className="basis-2/3 h-full">
                    <PlotList />
                </div>
                <div className="basis-1/3 h-full">
                    <Metrics />
                </div>
            </div>

            <div className="basis-2/3 grow flex relative bg-white border rounded-md shadow-sm dark:bg-slate-800 dark:border-slate-700">
                <div className="h-full w-full flex justify-center items-center absolute top-0">
                    <PlotMain />
                </div>
                <div className="py-5 px-6 text-base z-0 font-bold uppercase dark:text-teal-100">
                    {currentPlot}
                </div>
            </div>

            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                <div className="basis-1/2">
                    <InfoMenu />
                </div>
                <div className="basis-1/2">
                    <ExportModel />
                </div>
            </div>
        </div>
    );
}