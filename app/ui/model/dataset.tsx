"use client";

import "@/app/globalicons.css";
import Link from "next/link";
import { RadioOption } from "@/app/ui/model/list-options";

import { changeDataset } from "@/app/lib/redux/features/network-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";

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

    const currentDataset = useAppSelector((state) => state.networkReducer.dataset);
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        dispatch(changeDataset(event.currentTarget.value));
    }

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
                                    handleChange={handleChange}
                                    isChecked={item.id === currentDataset}
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
