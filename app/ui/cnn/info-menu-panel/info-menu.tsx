"use client";

import React, { useState, useEffect } from 'react';
import LayerInfo from "@/app/ui/cnn/info-menu-panel/info-menu-templates/layer-info";
import DefaultInfo from './info-menu-templates/default-info';
import ConvolutionInfo from './info-menu-templates/convolution-info';
import PoolingInfo from './info-menu-templates/pooling-info';

import { setInfo } from "@/app/lib/redux/features/info-menu-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";

export default function InfoMenu() {

    
    const dispatch = useDispatch<AppDispatch>();
    const { infoType, itemId } = useAppSelector((state) => state.infoMenuReducer);
    const [objectToDisplay, setObjectToDisplay] = useState<JSX.Element>();
    const { modelId } = useAppSelector((state) => state.networkReducer);
    
    const objects = useAppSelector((state) => state.modelsReducer[modelId].layers);
    const selectedObject = objects.find(el => el.id === itemId);

    useEffect(() => {
        const itemType = selectedObject?.type;
        // console.log("INFO TYPE:", infoType, itemType);
        if (itemType === "hidden" || itemType === "input" || itemType === "output") {
            setObjectToDisplay(<LayerInfo />);
        } else if (itemType === "convolution") {
            console.log("convolution");
            setObjectToDisplay(<ConvolutionInfo />);
        } else if (itemType === "pooling") {
            setObjectToDisplay(<PoolingInfo />);
        } else {
            console.log("default");
            setObjectToDisplay(<DefaultInfo />);
        }
    }, [infoType]);

    useEffect(() => {
        dispatch(setInfo({ infoType: "", id: "" }));
    }, [modelId]);

    return (
        <div className="bg-white flex rounded-md shadow-sm h-full border dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 px-6 w-full relative">
                <div className="flex flex-col">
                    {objectToDisplay}
                </div>
            </div>
        </div>
    );
}
