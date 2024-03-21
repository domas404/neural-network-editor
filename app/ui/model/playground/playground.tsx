"use client";

import "@/app/globalicons.css";
import Script from "next/script";
import Flow from "./network-flow"
import React, { useEffect } from "react";
// import { useAppSelector } from "@/app/lib/redux/store";

import { setInfo } from "@/app/lib/redux/features/info-menu-slice";
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/lib/redux/store';

export default function Playground() {
    
    const dispatch = useDispatch<AppDispatch>();
    const currentModel = useAppSelector((state) => state.networkReducer.modelId);

    useEffect(() => {
        dispatch(setInfo({ infoType: "concept", id: currentModel }));
    }, []);

    return (
        <>
            <div className="flex rounded-xl shadow-sm h-full">
                <div className="w-full">
                    <div className="flex flex-col h-full w-full relative">
                        <div className="flex flex-row h-full w-full justify-center items-center absolute top-0 text-sm leading-5 overflow-scroll">
                            <Flow />
                        </div>
                        {/* <div className="py-5 px-6 text-base z-0 font-bold uppercase">
                            { currentModel }
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js" /> */}
        </>
    );
}
