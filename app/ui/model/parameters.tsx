"use client";

import Param from "@/app/ui/model/param-box";
import React, { useCallback } from "react";
import { HyperparameterSet } from "@/app/lib/data-types";
import parameterOptions from "@/app/lib/parameter-options";

import { changeParameter } from "@/app/lib/redux/features/param-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";

export default function Parameters() {

    const hyperparams = useAppSelector((state) => state.paramReducer);
    const dispatch = useDispatch<AppDispatch>();

    const listenChange = useCallback((parameter: string, value: number | string) => {
        dispatch(changeParameter({parameter, value}));
    }, [dispatch]);

    const mappedParameters = parameterOptions.map((parameter) => {
        return (
            <Param
                key={parameter.id}
                handleChange={listenChange}
                defaultVal={hyperparams[parameter.id as keyof HyperparameterSet]}
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
