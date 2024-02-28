import "@/app/globalicons.css";
import Link from "next/link";
import React, { useContext } from "react";
import { NetworkContext } from "@/app/ui/model/main";

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
    // const { network, setNetwork } = useContext(NetworkContext);

    // const updateNetwork = event => {
    //     setNetwork({
    //         ...network,
    //         dataset: event.target.value
    //     });
    // }

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
                                        // onChange={updateNetwork}
                                        type="radio"
                                        id={item.id}
                                        name="dataset"
                                        value={item.id}
                                        className="opacity-0 hidden peer"
                                        required
                                        // checked={item.id === network.dataset}
                                    />
                                    <label
                                        htmlFor={item.id}
                                        className={`flex items-center justify-center rounded-full cursor-pointer py-2 px-4
                                            text-black bg-gray-100 peer-checked:text-white peer-checked:bg-black`}>
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
