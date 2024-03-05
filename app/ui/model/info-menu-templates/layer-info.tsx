import "@/app/globalicons.css";
import Param from "@/app/ui/model/param-box";
import React, { useState } from 'react';

interface LayerInfoProps {
    objectName: string;
}

const MAX_NEURON_COUNT = 12;
const MIN_NEURON_COUNT = 1;

export default function LayerInfo() {

    const [neuronCount, setNeuronCount] = useState(MIN_NEURON_COUNT);
    const [activation, setActivation] = useState()

    const handleChange = (paramType: string, value: number | string) => {
        console.log(paramType, value);
    }

    const addNeuron = () => {
        if (neuronCount < MAX_NEURON_COUNT){
            setNeuronCount(neuronCount + 1);
        }
    }

    const removeNeuron = () => {
        if (neuronCount > MIN_NEURON_COUNT){
            setNeuronCount(neuronCount - 1);
        }
    }

    return (
        <div>
            <Param
                handleChange={handleChange}
                defaultVal={"Sigmoid"}
                paramType={"activation"}
                paramName={"activation"}
                paramOptions={["Sigmoid", "tanH", "ReLU"]}
            />
            <div>
                <div className="text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1">
                    Neurons
                </div>
                <div className="bg-gray-50 border py-2.5 w-28 px-2 text-sm rounded-lg h-10 flex flex-row items-center justify-between">
                    <div className="basis-2/5 h-full text-center">
                        <span>{neuronCount}</span>
                    </div>
                    <div className="flex basis-3/5 justify-center">
                        <button
                            onClick={addNeuron}
                            className="select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200">
                            <span className="material-symbols-outlined text-gray-600 md-20">
                                add
                            </span>
                        </button>
                        <button
                            onClick={removeNeuron}
                            className="select-none flex items-center rounded-full hover:bg-gray-200 p-1 active:bg-blue-200">
                            <span className="material-symbols-outlined text-gray-600 md-20">
                                remove
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
