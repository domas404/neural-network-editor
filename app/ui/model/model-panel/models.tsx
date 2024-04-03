"use client";

import "@/app/globalicons.css";
import { RadioOption } from "@/app/ui/misc/list-options";
import { changeModel } from "@/app/lib/redux/features/network-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { useState } from "react";

interface modelInfo {
    id: string,
    name: string
}

const modelNames: modelInfo[] = [
    { id: "default", name: "Default" },
    { id: "mymodel", name: "My Model" }
];

interface ModelMenuProps {
    pos: {
        x: number,
        y: number
    };
}

const ModelMenu = ({ pos }: ModelMenuProps) => {
    const height = pos.y - 118;
    return (
        <div
            className="absolute z-10 rounded-md w-48 flex border
                bg-white dark:bg-slate-700 dark:border-slate-600"
            style={{ left: pos.x, top: height }}
        >
            <div className="flex flex-col w-full m-1 text-black dark:text-white text-sm">
                <div className="w-full p-2 rounded-md hover:cursor-pointer flex flex-row gap-2
                    bg-white hover:bg-slate-200 active:bg-lightblue-200
                    dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500">
                    <div className="flex items-center">
                        <span className="material-symbols-outlined md-20">
                            upload
                        </span>
                    </div>
                    <div>Upload from pc</div>
                </div>
                <div className="w-full p-2 rounded-md hover:cursor-pointer flex flex-row gap-2
                    bg-white hover:bg-slate-200 active:bg-lightblue-200
                    dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500">
                    <div className="flex items-center">
                        <span className="material-symbols-outlined md-20">
                            add_circle
                        </span>
                    </div>
                    <div>Create default</div>
                </div>
                <div className="w-full p-2 rounded-md hover:cursor-pointer flex flex-row gap-2
                    bg-white hover:bg-slate-200 active:bg-lightblue-200
                    dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500">
                    <div className="flex items-center">
                        <span className="material-symbols-outlined md-20">
                            add_circle
                        </span>
                    </div>
                    <div>Create from current</div>
                </div>
            </div>
        </div>
    )
}

export default function Models() {

    const currentModel = useAppSelector((state) => state.networkReducer.modelId);
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        dispatch(changeModel(event.currentTarget.value));
    }

    const [menuOpen, setMenuOpen] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0});

    const closeModelMenu = () => {
        document.removeEventListener('mouseup', closeModelMenu);
        setMenuOpen(false);
    }
    
    const openModelMenu = (event: React.MouseEvent<HTMLElement>) => {
        if (!menuOpen) {
            const left = event.currentTarget.offsetLeft;
            const top = event.currentTarget.offsetTop;
            const width = event.currentTarget.offsetWidth;
            const height = event.currentTarget.offsetHeight;
            setButtonPosition({ x: left + width, y: top + height/2 })
            setMenuOpen(true);
            document.addEventListener('mouseup', closeModelMenu);
        }
    }
    
    return (
        <div className="bg-white flex rounded-md border shadow-sm h-full dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 px-6 w-full relative">
                <div className="flex justify-between">
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        Model
                    </div>
                    <div className="absolute right-4 top-4 flex p-1 rounded-full select-none hover:cursor-pointer
                        hover:bg-slate-200 active:bg-lightblue-200 transition-all ease-in-out duration-200
                        dark:hover:bg-slate-700 dark:active:bg-slate-600"
                        onClick={openModelMenu}
                    >
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-100">
                            add
                        </span>
                    </div>
                    {menuOpen && <ModelMenu pos={buttonPosition} />}
                </div>
                <div className="overflow-x-scroll flex flex-row h-14 items-center gap-2">
                    {
                        modelNames.map((item) => {
                            return (
                                <RadioOption
                                    key={item.id}
                                    id={item.id}
                                    handleChange={handleChange}
                                    isChecked={item.id === currentModel}
                                    name={item.name}
                                    groupName="model"
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
