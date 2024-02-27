// import "@/app/globalicons.css";
// import Script from "next/script";
import { v4 } from "uuid";
import React, { useState, useEffect } from "react";

interface LayerProps {
    layerId: string,
    neuronCount: number,
}

export default function Layer({ layerId, neuronCount }: LayerProps) {

    const [neurons, setNeurons] = useState<string[]>([]);

    useEffect(() => {
        let initialArray: string[] = [];
        for (let i=0; i<neuronCount; i++) {
            initialArray.push(v4());
        }
        setNeurons(initialArray);
    }, []);

    return (
        <div className={`flex h-full group hover:bg-gray-100 hover:cursor-pointer px-10 ${layerId}`}>
            <div className="flex flex-col gap-8 h-full justify-center items-center">
                {
                    neurons.map((item) => {
                        return (
                            <div
                                key={item}
                                id={item}
                                className="w-12 h-12 rounded-full bg-white group-hover:bg-gray-100 select-none flex-none
                                border-4 border-gray-800 group-active:border-sky-600 shadow-md shadow-gray-300 group-active:shadow-sm"
                            ></div>
                        )
                    })
                }
            </div>
        </div>
    );
}
