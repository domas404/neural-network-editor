"use client";

import "@/app/globalicons.css";
import { RadioOption } from "@/app/ui/misc/list-options";
import { changeModel } from "@/app/lib/redux/features/network-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";

interface modelInfo {
    id: string,
    name: string
}

const modelNames: modelInfo[] = [
    { id: "default", name: "Default" },
    { id: "mymodel", name: "My Model" }
];

export default function Models() {

    const currentModel = useAppSelector((state) => state.networkReducer.modelId);
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        dispatch(changeModel(event.currentTarget.value));
    }

    return (
        <div className="bg-white flex rounded-md border shadow-sm h-full dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 px-6 w-full relative">
                <div className="flex justify-between">
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        Model
                    </div>
                    <div className="absolute right-4 top-4 flex p-1 rounded-full select-none hover:cursor-pointer
                        hover:bg-slate-200 active:bg-lightblue-200 transition-all ease-in-out duration-200
                        dark:hover:bg-slate-700 dark:active:bg-slate-600">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-100">
                            add
                        </span>
                    </div>
                </div>
                <div className="overflow-x-scroll flex flex-row h-14 items-center gap-2">
                    {
                        modelNames.map((item) => {
                            return (
                                <RadioOption
                                    key={item.id}
                                    id={item.id}
                                    handleChange={handleChange}
                                    isChecked={item.id === currentModel}
                                    name={item.name}
                                    groupName="model"
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
