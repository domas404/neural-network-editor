"use client";

import "@/app/globalicons.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import allDatasets from "@/app/lib/all-datasets";

import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { changeDataset } from "@/app/lib/redux/features/network-slice";
import { useDispatch } from "react-redux";

export default function DatasetList() {

    const dispatch = useDispatch<AppDispatch>();
    const dataset = useAppSelector((state) => state.networkReducer.dataset);

    const updateDataset = (event: React.FormEvent<HTMLInputElement>) => {
        dispatch(changeDataset(event.currentTarget.value));
        console.log("Dataset updated.");
    }

    return (
        <div className="flex rounded-md shadow-sm h-full bg-white border
            dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        Dataset
                    </div>
                </div>
                <div className="flex flex-col gap-1 my-4">
                    {
                        allDatasets.map((item) => {
                            return (
                                <li key={item.id} className="list-none my-1">
                                    <input
                                        onChange={updateDataset}
                                        type="radio"
                                        id={item.id}
                                        name="dataset"
                                        value={item.id}
                                        className="opacity-0 hidden peer"
                                        required
                                        checked={item.id === dataset}
                                    />
                                    <label
                                        htmlFor={item.id}
                                        className={`flex items-center justify-center rounded-full cursor-pointer py-2 px-4
                                            border text-black bg-slate-50 hover:bg-lightblue-50 hover:border-lightblue-100
                                            peer-checked:text-lightblue-800 peer-checked:bg-blue-100 peer-checked:border-lightblue-100
                                            dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 dark:hover:border-slate-500
                                            dark:peer-checked:text-white dark:peer-checked:bg-slate-500 dark:peer-checked:border-slate-400`}>
                                        <div className="flex justify-center items-center h-full font-semibold text-sm">
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
