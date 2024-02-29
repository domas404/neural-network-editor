import "@/app/globalicons.css";
import Link from "next/link";
import React, { useContext } from "react";
import { NetworkContext } from "@/app/ui/model/main";
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
    const networkContext = useContext(NetworkContext);

    const updateNetwork = (event: React.FormEvent<HTMLInputElement>) => {
        networkContext?.setNetwork({
            ...networkContext?.network,
            dataset: event.currentTarget.value
        });
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
                                    handleChange={updateNetwork}
                                    isChecked={item.id === networkContext?.network.dataset}
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
