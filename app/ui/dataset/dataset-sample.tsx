"use client";

import allDatasets from "@/app/lib/all-datasets";
import { shuffleDataRows } from "@/app/lib/redux/features/dataset-slice";
import { useAppSelector, AppDispatch } from "@/app/lib/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface DataRow {
    [key: string]: any;
}

export default function DatasetSample() {

    const dataset = useAppSelector((state) => state.datasetReducer);
    const datasetId = useAppSelector((state) => state.networkReducer.dataset);
    const [selectedDataset, setSelectedDataset] = useState(dataset[allDatasets[0].id]);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setSelectedDataset(dataset[datasetId]);
    }, [datasetId, dataset]);

    return (
        <>
            <div className="flex justify-between w-full text-sm mb-2 items-center">
                <div className="uppercase tracking-wider font-semibold text-right text-slate-600 dark:text-slate-300">
                    {selectedDataset.dataset.length} rows
                </div>
                <button className="py-1 px-2 uppercase tracking-wider font-semibold rounded-md bg-slate-100 border text-lightblue-900
                    hover:cursor-pointer hover:bg-lightblue-100 active:bg-lightblue-200
                    dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200
                    dark:hover:bg-slate-600 dark:hover:border-slate-500
                    dark:active:bg-slate-500 dark:active:border-slate-400"
                    onClick={() => dispatch(shuffleDataRows(datasetId))}
                >
                    Shuffle
                </button>
            </div>
            <div className="w-full h-full overflow-scroll">
                <table className="w-full h-full border-separate">
                    <thead className="w-full">
                        <tr className="sticky top-0">
                            <th className={`font-semibold border-1 border-white rounded-md py-2 px-4 overflow-hidden bg-slate-200
                                dark:bg-slate-600 dark:text-white`}>
                                {selectedDataset.columns[0]}
                            </th>
                            {
                                selectedDataset.features.map((column, index) => {
                                    if (selectedDataset.selectedFeatures[index]) {
                                        return (
                                            <th key={index} className={`font-semibold border-1 border-white rounded-md py-2 px-4
                                            overflow-hidden bg-slate-200 dark:bg-slate-600 dark:text-white`}>
                                                {column}
                                            </th>
                                        );
                                    }
                                })
                            }
                            <th className={`font-semibold border-1 border-white rounded-md py-2 px-4 overflow-hidden bg-slate-200
                                dark:bg-slate-600 dark:text-white`}>
                                {selectedDataset.columns[selectedDataset.columns.length-1]}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            selectedDataset.dataset.map((row: DataRow, rindex) => {
                                return (
                                    <tr key={`r${rindex}`}>
                                        <td className={`text-center border-1 border-white rounded-md py-1 bg-slate-100
                                            dark:text-white dark:bg-slate-700`}>
                                            {rindex+1}
                                        </td>
                                        {
                                            selectedDataset.features.map((column, dindex) => {
                                                if (selectedDataset.selectedFeatures[dindex]) {
                                                    return (
                                                        <td key={`d${rindex}-${dindex}`} className={`text-center border-1 px-4 border-white
                                                            rounded-md py-1 bg-slate-100 dark:text-white dark:bg-slate-700`}>
                                                            {row[column]}
                                                        </td>
                                                    );
                                                }
                                            })
                                        }
                                        <td className={`text-center border-1 border-white rounded-md py-1 bg-slate-100
                                            dark:text-white dark:bg-slate-700`}>
                                            {row[selectedDataset.columns[selectedDataset.columns.length-1]]}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}