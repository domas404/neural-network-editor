import { DatasetProps } from "@/app/lib/data-types";
import React, { useEffect, useState } from "react";

interface MatrixProps {
    confusionMatrix: number[][],
    dataset: DatasetProps
}

export default function ConfusionMatrix ({ confusionMatrix, dataset }: MatrixProps) {

    const [predictedLabels, setPredictedLabels] = useState<React.JSX.Element[]>();
    const [realLabels, setRealLabels] = useState<React.JSX.Element[]>();

    const createMatrixLabels = () => {
        const filteredLabels = dataset.labels.filter((item, index) => {
            if (dataset.selectedLabels[index]) {
                return item;
            }
        });
        const mappedLabels = filteredLabels.map((item, index) => {
            return (
                <div key={index} className="bg-lightblue-100 m-px h-24 w-12 flex items-center justify-center">
                    <span className="-rotate-90">{item}</span>
                </div>
            );
        });
        const mappedRealLabels = filteredLabels.map((item, index) => {
            return (
                <div key={index} className="bg-lightblue-100 m-px h-12 w-24 flex items-center justify-center">
                    <span className="">{item}</span>
                </div>
            );
        });
        setPredictedLabels(mappedLabels);
        setRealLabels(mappedRealLabels);
    }

    useEffect(() => {
        createMatrixLabels();
    }, [dataset]);

    return (
        <div className="h-full flex justify-center items-center">
            <div className="bg-white flex flex-row justify-center items-center">
                <div className="m-px h-full w-12 flex items-center justify-center">
                    <span className="-rotate-90">real</span>
                </div>
                <div className="">
                    <div className="m-px h-12 w-full flex items-center justify-center">
                        <span className="">predicted</span>
                    </div>
                    <div className="flex flex-row">
                        <div className="bg-lightblue-100 m-px h-24 w-24 flex items-center justify-center"></div>
                        {predictedLabels}
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            {realLabels}
                        </div>
                        <div className="no-flex">
                            {
                                confusionMatrix.map((row, index) => {
                                    return (
                                        <div key={index} className="flex flex-row">
                                            {
                                                row.map((item, rindex) => {
                                                    return (
                                                        <div
                                                            key={`${index}-${rindex}`}
                                                            className="bg-lightblue-100 m-px h-12 w-12 flex items-center justify-center
                                                                hover:bg-lightblue-50"
                                                        >
                                                            {item}
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}