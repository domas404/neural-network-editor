"use client";

import { useAppSelector } from "@/app/lib/redux/store";

interface DataRow {
    [key: string]: any;
}

export default function DatasetSample() {

    const dataset = useAppSelector((state) => state.datasetReducer.dataset);
    const columns = useAppSelector((state) => state.datasetReducer.columns);
    const datasetInfo = useAppSelector((state) => state.datasetReducer);

    return (
        <div className="w-full h-full overflow-scroll">
            <table className="w-full h-full border-separate">
                <thead className="w-full">
                    <tr className="sticky top-0">
                        <th className={`font-semibold border-1 border-white rounded-md py-2 px-4 overflow-hidden bg-slate-200`}>
                            {columns[0]}
                        </th>
                        {
                            datasetInfo.features.map((column, index) => {
                                if (datasetInfo.selectedFeatures[index]) {
                                    return (
                                        <th key={index} className={`font-semibold border-1 border-white rounded-md py-2 px-4 overflow-hidden bg-slate-200`}>
                                            {column}
                                        </th>
                                    );
                                }
                            })
                        }
                        <th className={`font-semibold border-1 border-white rounded-md py-2 px-4 overflow-hidden bg-slate-200`}>
                            {columns[columns.length-1]}
                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    {
                        dataset.map((row: DataRow, rindex) => {
                            return (
                                <tr key={`r${rindex}`}>
                                    <td className={`text-center border-1 border-white rounded-md py-1 bg-slate-100`}>
                                        {row[columns[0]]}
                                    </td>
                                    {
                                        datasetInfo.features.map((column, dindex) => {
                                            if (datasetInfo.selectedFeatures[dindex]) {
                                                return (
                                                    <td key={`d${rindex}-${dindex}`} className={`text-center border-1 px-4 border-white rounded-md py-1 bg-slate-100`}>
                                                        {row[column]}
                                                    </td>
                                                );
                                            }
                                        })
                                    }
                                    <td className={`text-center border-1 border-white rounded-md py-1 bg-slate-100`}>
                                        {row[columns[columns.length-1]]}
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}