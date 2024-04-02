import React, { memo, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

import "./index.css";

import { setInfo } from "@/app/lib/redux/features/info-menu-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";

import { addHiddenLayerAfter } from "@/app/lib/redux/features/model-slice";

const MAX_LAYER_COUNT = 8;

function CustomAddLayer( { data }: any ) {

    const dispatch = useDispatch<AppDispatch>();

    const onDragEnter = (event: React.DragEvent) => {
        event.currentTarget.classList.add("on-drag-over");
    }

    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      };

    const onDragLeave = (event: React.DragEvent) => {
        event.currentTarget.classList.remove("on-drag-over");
    }

    const modelId = useAppSelector((state) => state.networkReducer.modelId);
    const objects = useAppSelector((state) => state.modelsReducer[modelId].layers);

    const onDrop = async (event: React.DragEvent) => {
        console.log("before", objects);
        const insertAfterIndex = objects.findIndex((item) => item.id === data.layerId);
        event.currentTarget.classList.remove("on-drag-over");
        if (objects.length-2 < MAX_LAYER_COUNT) {
            dispatch(addHiddenLayerAfter({
                modelId: modelId,
                insertAfter: objects[insertAfterIndex],
                insertAfterIndex: insertAfterIndex
            }));
        }
    }

    return (
        <>
            <Handle type="target" id="a" position={Position.Left} isConnectable={false} className="hidden" />
            <div
                className="w-10 h-full rounded-lg"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
            </div>
            <Handle type="source" id="b" position={Position.Right} isConnectable={false} className="hidden" />
        </>
    );
}

export default memo(CustomAddLayer);
