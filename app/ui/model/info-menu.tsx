"use client";

import React, { useState, useEffect } from 'react';
import LayerInfo from "@/app/ui/model/info-menu-templates/layer-info";
import NeuronInfo from "@/app/ui/model/info-menu-templates/neuron-info";
import ConceptDefinition from "@/app/ui/model/info-menu-templates/concept-definition";

interface InfoMenuProps {
    objectName: string,
    toDisplay: string,
}

export default function InfoMenu({ objectName, toDisplay }: InfoMenuProps) {

    const [objectToDisplay, setObjectToDisplay] = useState<JSX.Element>();

    useEffect(() => {
        if (toDisplay === "layer") {
            setObjectToDisplay(<LayerInfo />);
        } else if (toDisplay === "neuron") {
            setObjectToDisplay(<NeuronInfo />);
        } else if (toDisplay === "concept") {
            setObjectToDisplay(<ConceptDefinition />);
        }
    }, [toDisplay]);


    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="bg-white text-base font-bold uppercase">
                        {objectName}
                    </div>
                    <div className="text-sm text-justify leading-5 mt-4 hyphens-auto">
                        {objectToDisplay}
                    </div>
                </div>
            </div>
        </div>
    );
}
