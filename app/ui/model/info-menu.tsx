"use client";

import React, { useState, useEffect } from 'react';
import LayerInfo from "@/app/ui/model/info-menu-templates/layer-info";
import NeuronInfo from "@/app/ui/model/info-menu-templates/neuron-info";
import ConceptDefinition from "@/app/ui/model/info-menu-templates/concept-definition";

import { setInfo } from "@/app/lib/redux/features/info-menu-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import DefaultInfo from './info-menu-templates/default-info';

export default function InfoMenu() {

    const dispatch = useDispatch<AppDispatch>();
    const { infoType } = useAppSelector((state) => state.infoMenuReducer);
    const [objectToDisplay, setObjectToDisplay] = useState<JSX.Element>();
    const { modelId } = useAppSelector((state) => state.networkReducer);

    useEffect(() => {
        if (infoType === "layer") {
            setObjectToDisplay(<LayerInfo />);
        } else if (infoType === "neuron") {
            setObjectToDisplay(<NeuronInfo />);
        } else if (infoType === "concept") {
            setObjectToDisplay(<ConceptDefinition />);
        } else {
            setObjectToDisplay(<DefaultInfo />);
        }
    }, [infoType]);

    useEffect(() => {
        dispatch(setInfo({ infoType: "", id: "" }));
    }, [modelId]);

    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    {objectToDisplay}
                </div>
            </div>
        </div>
    );
}
