import React, { memo, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

import "./index.css";

import { setInfo } from "@/app/lib/redux/features/info-menu-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";

import { addHiddenLayerAfter, reorderLayers } from "@/app/lib/redux/features/model-slice";
import { v4 } from 'uuid';
import { Layer } from '@/app/lib/data-types';

const MAX_LAYER_COUNT = 8;

function CustomAddLayer( { data }: any ) {

    const dispatch = useDispatch<AppDispatch>();
    const modelId = useAppSelector((state) => state.networkReducer.modelId);
    const objects = useAppSelector((state) => state.modelsReducer[modelId].layers);

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

    const onDrop = async (event: React.DragEvent) => {
        const insertAfterIndex = objects.findIndex((item) => item.id === data.layerId);
        event.currentTarget.classList.remove("on-drag-over");

        if (event.dataTransfer.getData("dragSource") === "playground") {
            dispatch(reorderLayers({
                modelId: modelId,
                layerToMoveId: event.dataTransfer.getData("layerToRemove"),
                moveToIndex: insertAfterIndex
            }));
            return;
        } else if (event.dataTransfer.getData("dragSource") === "layersPanel") {
            if (objects.length-2 < MAX_LAYER_COUNT) {
                const newLayerId = v4();
                dispatch(addHiddenLayerAfter({
                    modelId: modelId,
                    insertAfter: objects[insertAfterIndex] as Layer,
                    insertAfterIndex: insertAfterIndex,
                    newLayerId: newLayerId
                }));
                dispatch(setInfo({ infoType: "layer", id: newLayerId }));
            }
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
