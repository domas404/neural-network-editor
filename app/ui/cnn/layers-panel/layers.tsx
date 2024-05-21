import "@/app/globalicons.css";
import Image from 'next/image';
import fullyConnectedLayer from "@/public/neural-128-b.png";
import fullyConnectedLayerWhite from "@/public/neural-128-w.png";
import convolutionLayer from "@/public/convolution-thicker-edit-b.png";
import convolutionLayerWhite from "@/public/convolution-thicker-edit-w.png";
import poolingLayer from "@/public/pooling-smaller-edit-b.png";
import poolingLayerWhite from "@/public/pooling-smaller-edit-w.png";
import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/app/lib/redux/store";

export default function Layers() {

    const isDarkMode = useAppSelector((state) => state.settingsReducer.isDarkMode);

    const onDragStart = (event: React.DragEvent) => {
        console.log("Drag started");
        event.dataTransfer.clearData();
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData("dragSource", "layersPanel");
        console.log(event.currentTarget);
        event.dataTransfer.setData("layerType", event.currentTarget.id);
    };

    return (
        <div className="bg-white flex rounded-md shadow-sm border h-full dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 w-full">
                <div className="flex flex-col">
                    <div className="text-base font-bold uppercase dark:text-teal-100 px-6">
                        Layers
                    </div>
                    <div className="flex flex-col gap-px mt-3 mx-3 relative">
                        {/* <div className="absolute w-full h-full p-3">
                            <div className="bg-slate-200 dark:bg-slate-700 w-full h-full"></div>
                        </div> */}
                        <div className="bg-white dark:bg-slate-800 z-10">
                            <div
                                onDragStart={onDragStart}
                                id="convolution"
                                draggable
                                className="flex flex-row items-center rounded-lg select-none hover:cursor-grab hover:bg-gray-100 p-3
                                dark:hover:bg-slate-700 gap-2"
                            >
                                <div className="">
                                    <Image
                                        src={isDarkMode ? convolutionLayerWhite : convolutionLayer}
                                        width={28}
                                        height={28}
                                        alt=""
                                        draggable={false}
                                    />
                                </div>
                                <div className="text-sm dark:text-white">Convolution</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 z-10">
                            <div
                                onDragStart={onDragStart}
                                id="pooling"
                                draggable
                                className="flex flex-row items-center rounded-lg select-none hover:cursor-grab hover:bg-gray-100 p-3
                                dark:hover:bg-slate-700 gap-2"
                            >
                                <div className="">
                                    <Image
                                        src={isDarkMode ? poolingLayerWhite : poolingLayer}
                                        width={28}
                                        height={28}
                                        alt=""
                                        draggable={false}
                                    />
                                </div>
                                <div className="text-sm dark:text-white">Pooling</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 z-10">
                            <div
                                onDragStart={onDragStart}
                                id="fully-connected"
                                draggable
                                className="flex flex-row items-center rounded-lg select-none hover:cursor-grab hover:bg-gray-100 p-3
                                dark:hover:bg-slate-700 gap-2"
                            >
                                <div className="w-7 h-7 flex items-center justify-center">
                                    <Image
                                        src={isDarkMode ? fullyConnectedLayerWhite : fullyConnectedLayer}
                                        width={24}
                                        height={24}
                                        alt=""
                                        draggable={false}
                                    />
                                </div>
                                <div className="text-sm dark:text-white">Fully-connected</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
