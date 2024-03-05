import "@/app/globalicons.css";
import React, { useContext, useState, useEffect } from "react";
import { NetworkContext } from "@/app/ui/model/main";
import { RadioOption } from "@/app/ui/model/list-options";

interface modelInfo {
    id: string,
    name: string
}

const modelNames: modelInfo[] = [
    { id: "default", name: "Default" },
    { id: "mymodel", name: "My Model" }
];

export default function Models() {

    const [chosenModel, setChosenModel] = useState("default");
    const networkContext = useContext(NetworkContext);

    const updateDataset = (event: React.FormEvent<HTMLInputElement>) => {
        setChosenModel(event.currentTarget.value);
        networkContext?.updateNetworkModel(event);
    }

    useEffect(() => {
        let newNetwork = JSON.parse(localStorage.getItem("network")!);
        newNetwork.modelId = chosenModel;
        localStorage.setItem("network", JSON.stringify(newNetwork));
    }, [chosenModel]);

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
                                    handleChange={updateDataset}
                                    isChecked={item.id === chosenModel}
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
