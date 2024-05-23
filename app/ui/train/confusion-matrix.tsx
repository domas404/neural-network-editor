import { DatasetProps } from "@/app/lib/data-types";
import React, { useEffect, useState } from "react";

interface MatrixProps {
    confusionMatrix: number[][],
    dataset: DatasetProps
}

export default function ConfusionMatrix ({ confusionMatrix, dataset }: MatrixProps) {

    const [predictedLabels, setPredictedLabels] = useState<React.JSX.Element[]>();
    const [realLabels, setRealLabels] = useState<React.JSX.Element[]>();
    const [darkMode, setDarkMode] = useState(false);

    const handleDarkModeChange = () => {
        const isDarkMode = document.getElementsByTagName("html")[0].classList.contains("dark");
        setDarkMode(isDarkMode);
    }

    useEffect(() => {
        handleDarkModeChange();
    }, []);

    useEffect(() => {
        const observer = new MutationObserver(handleDarkModeChange);
        observer.observe(document.getElementsByTagName("html")[0], { attributes: true });
        return () => {
            observer.disconnect();
        }
    }, []);

    const createMatrixLabels = () => {
        const filteredLabels = dataset.labels.filter((item, index) => {
            if (dataset.selectedLabels[index]) {
                return item;
            }
        });
        const mappedLabels = filteredLabels.map((item, index) => {
            return (
                <div key={index} className="bg-lightblue-50 h-24 w-24 flex items-center justify-center dark:bg-slate-700 dark:text-white">
                    <span className="-rotate-45">{item}</span>
                </div>
            );
        });
        const mappedRealLabels = filteredLabels.map((item, index) => {
            return (
                <div key={index} className="bg-lightblue-50 h-24 w-24 flex items-center justify-center dark:bg-slate-700 dark:text-white">
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
            "hsl(220, 50%, 62%)"
        ];
        const darkColors = [
            "hsl(220, 40%, 32%)",
            "hsl(220, 42%, 36%)",
            "hsl(220, 44%, 40%)",
            "hsl(220, 46%, 44%)",
            "hsl(220, 48%, 48%)",
            "hsl(220, 50%, 52%)",
        ];
        const maxVal = Math.max(...row);
        const mappedRow = row.map((item, rindex) => {
            const colorValue = Math.round(item/maxVal*5);
            // console.log(colorValue);
            return (
                <div
                    key={`${index}-${rindex}`}
                    className={`h-24 w-24 flex items-center justify-center ${rindex === index ? "border-2 border-slate-500 dark:border-slate-400": ""} dark:text-white`}
                    style={{backgroundColor: darkMode ? darkColors[colorValue] : colors[colorValue]}}
                >
                    {item}
                </div>
            );
        })
        return mappedRow;
    }

    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col w-full h-5/6 overflow-scroll">
                <div className="flex flex-row gap-1 mb-1">
                    <div className="h-36 w-36 mt-1 ml-1"></div>
                    <div className="flex flex-col gap-1">
                        <div className="h-12 w-full flex items-center justify-center dark:text-white">
                            <span className="text-sm font-semibold uppercase text-gray-600 tracking-wider dark:text-slate-200">
                                predicted
                            </span>
                        </div>
                        <div className="flex flex-row gap-1">
                            {predictedLabels}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-stretch gap-1">
                    <div className="min-w-12 flex items-center justify-center dark:text-white">
                        <span className="-rotate-90 text-sm font-semibold uppercase text-gray-600 tracking-wider dark:text-slate-200">real</span>
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