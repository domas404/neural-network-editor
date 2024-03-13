"use client";

import "@/app/globalicons.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface datasetInfo {
    id: string,
    name: string
}

const datasetNames: datasetInfo[] = [
    { id: "iris", name: "Iris data" },
    { id: "placeholder", name: "Placeholder" },
    { id: "dataset", name: "Dataset" }
];

export default function DatasetList() {

    const [chosenDataset, setChosenDataset] = useState("iris");

    const updateDataset = (event: React.FormEvent<HTMLInputElement>) => {
        setChosenDataset(event.currentTarget.value);
    }

    useEffect(() => {
        setChosenDataset(JSON.parse(localStorage.getItem("network")!).dataset);
    }, []);

    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="bg-white text-base font-bold uppercase">
                        Dataset
                    </div>
                </div>
                <div className="flex flex-col gap-1 my-4">
                    {
                        datasetNames.map((item) => {
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
                                        checked={item.id === chosenDataset}
                                    />
                                    <label
                                        htmlFor={item.id}
                                        className={`flex items-center justify-center rounded-full cursor-pointer py-2 px-4
                                            border text-black bg-gray-50 peer-checked:text-white peer-checked:bg-black peer-checked:border-gray-800`}>
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
