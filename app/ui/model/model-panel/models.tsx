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
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="bg-white text-base font-bold uppercase">
                        Model
                    </div>
                    <div className="select-none hover:cursor-pointer text-gray-400 hover:text-gray-500 active:text-gray-600">
                        <span className="material-symbols-outlined">
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
