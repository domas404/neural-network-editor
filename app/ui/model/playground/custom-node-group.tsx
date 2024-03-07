"use client";

import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import { setInfo } from "@/app/lib/redux/features/info-menu-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";

interface nodeGroupProps {
    id: string;
}

function CustomNodeGroup() {

    // const currentModel = useAppSelector((state) => state.networkReducer.modelId);
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (event: React.MouseEvent<HTMLElement>) => {
        const layerId = event.currentTarget.parentElement!.getAttribute("data-id")!.toString();
        // console.log("Clicked on layer:", layerId);
        dispatch(setInfo({ infoType: "layer", id: layerId }));
    }

    return (
        <>
            <Handle type="target" id="a" position={Position.Left} isConnectable={false} className="hidden" />
            <div
                className="h-full w-24 rounded-lg hover:border-2 hover:border-blue-200 active:border-blue-40 hover:cursor-pointer"
                onClick={handleChange}
            ></div>
            <Handle type="source" id="b" position={Position.Right} isConnectable={false} className="hidden" />
        </>
    );
}

export default memo(CustomNodeGroup);