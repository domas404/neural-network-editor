"use client";

import React, { useState, useEffect } from 'react';
import LayerInfo from "@/app/ui/model/info-menu-templates/layer-info";
import NeuronInfo from "@/app/ui/model/info-menu-templates/neuron-info";
import ConceptDefinition from "@/app/ui/model/info-menu-templates/concept-definition";

import { useAppSelector } from "@/app/lib/redux/store";

export default function InfoMenu() {

    const { infoType } = useAppSelector((state) => state.infoMenuReducer);
    const [objectToDisplay, setObjectToDisplay] = useState<JSX.Element>();

    useEffect(() => {
        if (infoType === "layer") {
            setObjectToDisplay(<LayerInfo />);
        } else if (infoType === "neuron") {
            setObjectToDisplay(<NeuronInfo />);
        } else if (infoType === "concept") {
            setObjectToDisplay(<ConceptDefinition />);
        }
    }, [infoType]);


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
