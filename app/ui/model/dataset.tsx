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

export default function Dataset() {
    const { network, setNetwork } = useContext(NetworkContext);

    const updateNetwork = event => {
        setNetwork({
            ...network,
            dataset: event.target.value
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
                                <li key={item.id} className="flex-none list-none my-2">
                                    <input onChange={updateNetwork} type="radio" id={item.id} name="dataset" value={item.id} className="opacity-0 hidden peer" required checked={item.id === network.dataset} />
                                    <label htmlFor={item.id} className={`flex items-center justify-between rounded-full cursor-pointer h-8 px-4
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
