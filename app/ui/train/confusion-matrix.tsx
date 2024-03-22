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
                <div key={index} className="bg-lightblue-50 h-24 w-24 flex items-center justify-center">
                    <span className="-rotate-45">{item}</span>
                </div>
            );
        });
        const mappedRealLabels = filteredLabels.map((item, index) => {
            return (
                <div key={index} className="bg-lightblue-50 h-24 w-24 flex items-center justify-center">
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

    const matrixValues = (row: number[], index: number) => {
        const colors = [
            "hsl(220, 60%, 92%)",
            "hsl(220, 58%, 86%)",
            "hsl(220, 56%, 80%)",
            "hsl(220, 54%, 74%)",
            "hsl(220, 52%, 68%)",
            "hsl(220, 52%, 62%)"
        ];
        const maxVal = Math.max(...row);
        const mappedRow = row.map((item, rindex) => {
            const colorValue = Math.round(item/maxVal*5);
            console.log(colorValue);
            return (
                <div
                    key={`${index}-${rindex}`}
                    className={`h-24 w-24 flex items-center justify-center ${rindex === index ? "border-2": ""}`}
                    style={{backgroundColor: colors[colorValue]}}
                >
                    {item}
                </div>
            );
        })
        return mappedRow;
    }

    return (
        <div className="h-full flex justify-center items-center">
            <div className="bg-white flex flex-col justify-center items-center">
                <div className="flex flex-row gap-1 mb-1">
                    <div className="h-36 w-36 mt-1 ml-1"></div>
                    <div className="flex flex-col gap-1">
                        <div className="h-12 w-full flex items-center justify-center">
                            <span className="">predicted</span>
                        </div>
                        <div className="flex flex-row gap-1">
                            {predictedLabels}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-stretch gap-1">
                    <div className="min-w-12 flex items-center justify-center">
                        <span className="-rotate-90">real</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        {realLabels}
                    </div>
                    <div className="flex-none">
                        {
                            confusionMatrix.map((row, index) => {
                                return (
                                    <div key={index} className="flex flex-row gap-1 mb-1">
                                        { matrixValues(row, index) }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}