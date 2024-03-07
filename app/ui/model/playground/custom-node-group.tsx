"use client";

import React, { memo, useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

import { setInfo } from "@/app/lib/redux/features/info-menu-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";

function CustomNodeGroup() {

    const [clicked, setClicked] = useState(false);
    const [layer, setLayer] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const { itemId } = useAppSelector((state) => state.infoMenuReducer);

    const handleChange = (event: React.MouseEvent<HTMLElement>) => {
        const layerId = event.currentTarget.parentElement!.getAttribute("data-id")!.toString();
        setLayer(layerId);
        dispatch(setInfo({ infoType: "layer", id: layerId }));
    }

    useEffect(() => {
        if (itemId === "") {
            setClicked(false);
        } else if (itemId === layer){
            setClicked(true);
        } else {
            setClicked(false);
        }
    }, [itemId]);

    return (
        <>
            <Handle type="target" id="a" position={Position.Left} isConnectable={false} className="hidden" />
            <div
                className={`h-full w-24 rounded-lg hover:cursor-pointer
                    ${clicked? "border-2 border-blue-400" : "hover:border-2 hover:border-blue-200"}`}
                onClick={handleChange}
            ></div>
            <Handle type="source" id="b" position={Position.Right} isConnectable={false} className="hidden" />
        </>
    );
}

export default memo(CustomNodeGroup);