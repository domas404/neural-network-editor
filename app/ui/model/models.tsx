import "@/app/globalicons.css";
import React, { useContext } from "react";
import { NetworkContext } from "@/app/ui/model/main";

interface modelInfo {
    id: string,
    name: string
}

const modelNames: modelInfo[] = [
    { id: "default", name: "Default" },
    { id: "mymodel", name: "My Model" }
];

export default function Models() {

    const { network, setNetwork } = useContext(NetworkContext);

    const updateNetwork = event => {
        setNetwork({
            ...network,
            modelName: event.target.value
        });
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
                                <li key={item.id} className="flex-none list-none my-2">
                                    <input onChange={updateNetwork} type="radio" id={item.id} name="model" value={item.id} className="opacity-0 hidden peer" required checked={item.id === network.modelName} />
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
