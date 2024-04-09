"use client";

import React, { memo, useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

import { setInfo } from "@/app/lib/redux/features/info-menu-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { setLayerBeingDragged, setLayerNotBeingDragged } from '@/app/lib/redux/features/settings-slice';

function CustomNodeGroup( { data }: any ) {

    const [clicked, setClicked] = useState(false);
    const [layer, setLayer] = useState("none");

    const dispatch = useDispatch<AppDispatch>();
    const { itemId } = useAppSelector((state) => state.infoMenuReducer);

    const container = document.getElementById("playground")!;

    const handleChange = (event: React.MouseEvent<HTMLElement>) => {
        const layerId = event.currentTarget.parentElement!.getAttribute("data-id")!.toString();
        setLayer(layerId);
        if (!clicked) {
            selectLayer(layerId);
            container.addEventListener('mouseup', deselectLayer);
        }
    }

    const selectLayer = (layerId: string) => {
        setClicked(true);
        dispatch(setInfo({ infoType: "layer", id: layerId }));
    }

    const deselectLayer = () => {
        dispatch(setInfo({ infoType: "", id: "" }));
        setTimeout(() => {
            setClicked(false);
            container.removeEventListener('mouseup', deselectLayer);
        }, 50);
    }

    useEffect(() => {
        if (layer !== itemId) {
            setClicked(false);
            if (itemId === data.id) {
                setLayer(data.id);
                setClicked(true);
                container.addEventListener('mouseup', deselectLayer);
            }
        }
    }, [itemId]);

    const onDragStart = (event: React.DragEvent) => {
        dispatch(setLayerBeingDragged());
        const layerId = event.currentTarget.parentElement!.getAttribute("data-id")!.toString();
        event.dataTransfer.setData("layerToRemove", layerId);
        event.dataTransfer.setData("dragSource", "playground");
    }

    return (
        <>
            <Handle type="target" id="a" position={Position.Left} isConnectable={false} className="hidden" />
            <div
                className={`h-full w-24 rounded-lg hover:cursor-pointer border-2 border-transparent hover:border-blue-200 dark:hover:border-slate-600
                    ${clicked? "!border-blue-400" : ""}`}
                onClick={handleChange}
                draggable
                onDragStart={onDragStart}
                onDragEnd={() => dispatch(setLayerNotBeingDragged())}
            ></div>
            <Handle type="source" id="b" position={Position.Right} isConnectable={false} className="hidden" />
        </>
    );
}

export default memo(CustomNodeGroup);