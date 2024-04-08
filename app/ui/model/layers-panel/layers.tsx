import "@/app/globalicons.css";
import Image from 'next/image';
import fullyConnectedLayer from "@/public/neural-128-b.png";
import fullyConnectedLayerWhite from "@/public/neural-128-w.png";
import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/app/lib/redux/store";

export default function Layers() {

    // const [darkMode, setDarkMode] = useState(false);
    const isDarkMode = useAppSelector((state) => state.settingsReducer.isDarkMode);

    // const handleDarkModeChange = () => {
    //     const isDarkMode = document.getElementsByTagName("html")[0].classList.contains("dark");
    //     setDarkMode(isDarkMode);
    // }

    // useEffect(() => {
    //     handleDarkModeChange();
    // }, []);

    const onDragStart = (event: React.DragEvent) => {
        console.log("Drag started");
        event.dataTransfer.clearData();
        event.dataTransfer.setData('text/plain', event.currentTarget.id);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="bg-white flex rounded-md shadow-sm border h-full dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 w-full">
                <div className="flex flex-col">
                    <div className="text-base font-bold uppercase dark:text-teal-100 px-6">
                        Layers
                    </div>
                    <div className="flex flex-col gap-px mt-3 mx-3 relative">
                        <div className="absolute w-full h-full p-3">
                            <div className="bg-slate-200 dark:bg-slate-700 w-full h-full"></div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 z-10">
                            <div
                                onDragStart={onDragStart}
                                draggable
                                className="flex flex-row items-center rounded-lg select-none hover:cursor-grab hover:bg-gray-100 p-3
                                dark:hover:bg-slate-700 gap-2"
                            >
                                <div className="">
                                    <Image
                                        src={isDarkMode ? fullyConnectedLayerWhite : fullyConnectedLayer}
                                        width={28}
                                        height={28}
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
