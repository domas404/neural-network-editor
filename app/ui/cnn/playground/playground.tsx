"use client";

import Flow from "./network-flow"
import { AppDispatch, useAppSelector } from '@/app/lib/redux/store';
import { PlaygroundSkeleton } from "../../misc/skeletons";
import { useDispatch } from "react-redux";
import "./custom-elements/index.css";
import { removeLayer } from "@/app/lib/redux/features/model-slice";

export default function Playground() {

    const dispatch = useDispatch<AppDispatch>();
    const datasetId = useAppSelector((state) => state.networkReducer.dataset);
    const modelId = useAppSelector((state) => state.networkReducer.modelId);
    const datasetLoaded = useAppSelector((state) => state.datasetReducer[datasetId].loaded);
    const layerBeingDragged = useAppSelector((state) => state.settingsReducer.isLayerBeingDragged);

    const onDragEnter = (event: React.DragEvent) => {
        event.currentTarget.children[0].classList.add("bin-dragged-over");
    }

    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    const onDragLeave = (event: React.DragEvent) => {
        event.currentTarget.children[0].classList.remove("bin-dragged-over");
    }

    const onDrop = async (event: React.DragEvent) => {
        const layerToRemove = event.dataTransfer.getData("layerToRemove");
        dispatch(removeLayer({ modelName: modelId, layerId: layerToRemove }));
    }

    return (
        <>
            <div className="flex bg-white dark:bg-slate-800 rounded-md border shadow-sm h-full dark:border-slate-700">
                <div className="w-full">
                    <div className="flex flex-col h-full w-full relative">
                        <div id="playground" className="flex flex-row h-full w-full justify-center items-center absolute top-0 text-sm leading-5">
                            { datasetLoaded ? <Flow /> : <PlaygroundSkeleton /> }
                            {
                                layerBeingDragged
                                &&
                                <div
                                    className="z-10 absolute top-10 right-10 w-20 h-20 flex justify-center items-center select-none"
                                    onDragEnter={onDragEnter}
                                    onDragLeave={onDragLeave}
                                    onDragOver={onDragOver}
                                    onDrop={onDrop}
                                >
                                    <div className="w-16 h-16 flex justify-center items-center rounded-full pointer-events-none border-2
                                        bg-red-200 border-red-200 shadow-[0_0_8px_10px_rgba(254,202,202,0.5)] text-red-800 dark:text-red-300
                                        dark:bg-slate-700 dark:border-red-300 dark:shadow-[0_0_10px_10px_rgba(254,202,202,0.2)]">
                                        <span className="material-symbols-outlined">
                                            delete
                                        </span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
