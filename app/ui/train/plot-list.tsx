"use client";

import "@/app/globalicons.css";
import React, { useState, useEffect } from "react";
import { setInfo } from "@/app/lib/redux/features/info-menu-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";

interface plotInfo {
    id: string,
    name: string
}

const plotNames: plotInfo[] = [
    { id: "accuracy", name: "Accuracy" },
    { id: "loss", name: "Loss" },
    { id: "confusion-matrix", name: "Confusion matrix" }
];

export default function PlotList() {

    const chosenPlot = useAppSelector((state) => state.infoMenuReducer.itemId);
    const dispatch = useDispatch<AppDispatch>();
    // const [chosenPlot, setChosenPlot] = useState(initialPlot);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        dispatch(setInfo({ infoType: "concept", id: event.currentTarget.value }));
    }

    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="bg-white text-base font-bold uppercase">
                        Plot
                    </div>
                </div>
                <div className="flex flex-col gap-1 my-4">
                    {
                        plotNames.map((item) => {
                            return (
                                <li key={item.id} className="list-none my-1">
                                    <input
                                        onChange={handleChange}
                                        type="radio"
                                        id={item.id}
                                        name="plot"
                                        value={item.id}
                                        className="opacity-0 hidden peer"
                                        required
                                        checked={item.id === chosenPlot}
                                    />
                                    <label
                                        htmlFor={item.id}
                                        className={`flex items-center justify-center rounded-full cursor-pointer py-2 px-4 border
                                            text-black bg-slate-50 hover:bg-lightblue-50 hover:border-lightblue-100
                                            peer-checked:text-lightblue-800 peer-checked:bg-blue-100 peer-checked:border-lightblue-100`}>
                                        <div
                                            className="text-center font-semibold text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                                            title={item.id}
                                        >
                                            {item.name}
                                        </div>
                                    </label>
                                </li>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
