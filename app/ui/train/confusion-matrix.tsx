import { DatasetProps } from "@/app/lib/data-types";
import React, { useEffect, useState } from "react";

interface MatrixProps {
    confusionMatrix: number[][],
    dataset: DatasetProps
}

export default function ConfusionMatrix ({ confusionMatrix, dataset }: MatrixProps) {

    const [matrixLabels, setMatrixLabels] = useState<React.JSX.Element[]>();

    const createMatrixLabels = () => {
        const filteredLabels = dataset.targets.filter((item, index) => {
            if (dataset.selectedTargets[index]) {
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
        setMatrixLabels(mappedLabels);
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
                        {matrixLabels}
                    </div>
                    {
                        confusionMatrix.map((row, index) => {
                            return (
                                <div key={index} className="flex flex-row">
                                    <div className="bg-lightblue-100 m-px h-12 w-24 flex items-center justify-center">
                                        label
                                    </div>
                                    {
                                        row.map((item, rindex) => {
                                            return (
                                                <div
                                                    key={`${index}-${rindex}`}
                                                    className="bg-lightblue-100 m-px h-12 w-12 flex items-center justify-center"
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
    );
}