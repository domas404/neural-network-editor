// import "@/app/globalicons.css";
// import Script from "next/script";
import React from "react";

interface LayerProps {
    layerId: number,
    neuronCount: number,
}

export default function Layer({ layerId, neuronCount }: LayerProps) {
    let neurons = new Array(neuronCount).fill("");
    return (
        <div className="flex h-full group hover:bg-gray-100 hover:cursor-pointer p-8">
            <div className="flex flex-col gap-10 h-full justify-center items-center">
                {
                    neurons.map((item, i) => {
                        return (
                            <div key={`${item.layerId}_${i}`} id={`${item.layerId}_${i}`} className="w-12 h-12 rounded-full bg-white group-hover:bg-gray-100 border-4 border-black group-active:border-sky-600"></div>
                        )
                    })
                }
            </div>
        </div>
    );
}
