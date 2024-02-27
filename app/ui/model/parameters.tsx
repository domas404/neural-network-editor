"use client";

import "@/app/globalicons.css";
import Param from "@/app/ui/model/param-box";
import React, { useState } from "react";

interface hyperparamsType {
    epochs: number;
    learningRate: number;
    batchSize: number;
    optimizer: string;
}

const defaultHyperparams: hyperparamsType = {
    epochs: 1,
    learningRate: 0.1,
    batchSize: 1,
    optimizer: "SGD",
}

export default function Parameters() {

    const [hyperparameters, setHyperparameters] = useState(defaultHyperparams);

    const handleChange = (paramType: string, value: number | string) => {
        setHyperparameters({
            ...hyperparameters,
            [paramType]: value
        });
        console.log(`${paramType} changed to ${value}`);
    }

    return (
        <div className="h-full">
            <div className="flex flex-col py-5 px-1 w-full h-full">
                <div className="mx-5 shrink">
                    <div className="bg-white text-base font-bold uppercase">
                        Hyperparameters
                    </div>
                </div>
                <div className="mx-1 mt-2 overflow-y-auto h-full">
                    <div className="mx-4 scrollable-container">
                        {/* <Param paramType="Train/Test Ratio" paramOptions={["50/50", "60/40", "70/30", "80/20", "90/10"]} /> */}
                        {/* <Param paramType="Activation" paramOptions={["ReLU", "Sigmoid", "TanH"]} /> */}
                        <Param handleChange={handleChange} paramType="epochs" paramName="Epochs" paramOptions={["1", "5", "10", "20", "50", "100", "200", "500", "1000"]} />
                        <Param handleChange={handleChange} paramType="learningRate" paramName="Learning Rate" paramOptions={["0.00001", "0.0001", "0.001", "0.01", "0.1", "1", "5", "10"]} />
                        <Param handleChange={handleChange} paramType="batchSize" paramName="Batch Size" paramOptions={["1", "2", "4", "8", "16", "24", "32", "64"]} />
                        <Param handleChange={handleChange} paramType="optimizer" paramName="Optimizer" paramOptions={["SGD", "Adam", "Adagrad"]} />
                        {/* <Param paramType="Regularitazion" paramOptions={["None", "L1", "L2"]} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
