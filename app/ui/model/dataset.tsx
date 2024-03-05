import "@/app/globalicons.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RadioOption } from "@/app/ui/model/list-options";

interface datasetInfo {
    id: string,
    name: string
}

const datasetNames: datasetInfo[] = [
    { id: "iris", name: "Iris data" },
    { id: "placeholder", name: "Placeholder" },
    { id: "dataset", name: "Dataset" }
];

export default function Dataset() {
    const [chosenDataset, setChosenDataset] = useState("iris");

    const updateDataset = (event: React.FormEvent<HTMLInputElement>) => {
        setChosenDataset(event.currentTarget.value);
    }

    useEffect(() => {
        let newNetwork = JSON.parse(localStorage.getItem("network")!);
        newNetwork.dataset = chosenDataset;
        localStorage.setItem("network", JSON.stringify(newNetwork));
    }, [chosenDataset]);

    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="bg-white text-base font-bold uppercase">
                        Dataset
                    </div>
                    <Link href="/model/data" className="select-none hover:cursor-pointer text-gray-400 hover:text-gray-500 active:text-gray-600">
                        <span className="material-symbols-outlined">
                            arrow_right_alt
                        </span>
                    </Link>
                </div>
                <div className="overflow-x-scroll flex flex-row h-14 items-center gap-2">
                    {
                        datasetNames.map((item) => {
                            return (
                                <RadioOption
                                    key={item.id}
                                    id={item.id}
                                    handleChange={updateDataset}
                                    isChecked={item.id === chosenDataset}
                                    name={item.name}
                                    groupName="dataset"
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
