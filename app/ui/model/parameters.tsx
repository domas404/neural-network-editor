"use client";

import Param from "@/app/ui/model/param-box";
import React, { useCallback } from "react";
import { HyperparameterSet } from "@/app/lib/data-types";
import parameterOptions from "@/app/lib/parameter-options";

const defaultHyperparams: HyperparameterSet = {
    epochs: 1,
    learningRate: 0.1,
    batchSize: 1,
    optimizer: "SGD",
}

export default function Parameters() {

    const handleChange = (paramType: string, value: number | string) => {
        let hyperparamsToChange = JSON.parse(localStorage.getItem("hyperparams")!);
        hyperparamsToChange[paramType] = value;
        localStorage.setItem("hyperparams", JSON.stringify(hyperparamsToChange));
    }

    const listenChange = useCallback((paramType: string, value: number | string) => {
        handleChange(paramType, value);
    }, []);

    const mappedParameters = parameterOptions.map((parameter) => {
        return (
            <Param
                key={parameter.id}
                handleChange={listenChange}
                defaultVal={defaultHyperparams[parameter.id as keyof HyperparameterSet]}
                paramType={parameter.id}
                paramName={parameter.name}
                paramOptions={parameter.options}
            />
        );
    });

    return (
        <div className="h-full rounded-xl shadow-sm">
            <div className="flex flex-col py-5 px-1 w-full h-full">
                <div className="mx-5 shrink">
                    <div className="bg-white text-base font-bold uppercase text-ellipsis overflow-hidden" title="Hyperparameters">
                        Hyperparameters
                    </div>
                </div>
                <div className="mx-1 mt-2 overflow-y-auto h-full">
                    <div className="mx-4 scrollable-container">
                        {mappedParameters}
                    </div>
                </div>
            </div>
        </div>
    );
}
