"use client";

import allDatasets from "@/app/lib/all-datasets";
import { useAppSelector } from "@/app/lib/redux/store";
import { useEffect, useState } from "react";

interface DataRow {
    [key: string]: any;
}

export default function DatasetSample() {

    const dataset = useAppSelector((state) => state.datasetReducer);
    const datasetId = useAppSelector((state) => state.networkReducer.dataset);
    const [selectedDataset, setSelectedDataset] = useState(dataset[allDatasets[0].id]);

    useEffect(() => {
        setSelectedDataset(dataset[datasetId]);
    }, [datasetId, dataset]);

    return (
        <>
            <div className="uppercase text-sm tracking-wider font-semibold text-slate-600 text-right mb-2 dark:text-slate-300">
                {selectedDataset.dataset.length} rows
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
                                            {row[selectedDataset.columns[0]]}
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