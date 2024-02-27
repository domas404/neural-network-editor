"use client";

import "@/app/globalicons.css";
import Script from "next/script";
import Flow from "./playground/network-flow"

export default function Playground() {

    return (
        <>
            <div className="flex shadow-lg h-full">
                <div className="w-full">
                    <div className="flex flex-col h-full w-full relative">
                        <div className="flex flex-row h-full w-full justify-center items-center absolute top-0 text-sm leading-5 overflow-scroll">
                            <Flow />
                        </div>
                        <div className="py-5 px-6 text-base z-0 font-bold uppercase">
                            My model
                        </div>
                    </div>
                </div>
            </div>
            <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js" />
        </>
    );
}
