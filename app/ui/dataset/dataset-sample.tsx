"use client";

import { useAppSelector } from "@/app/lib/redux/store";

interface DataRow {
    [key: string]: any;
}

export default function DatasetSample() {

    const dataset = useAppSelector((state) => state.datasetReducer.dataset);
    const columns = useAppSelector((state) => state.datasetReducer.columns);

    return (
        <div className="w-full h-full overflow-scroll">
            <table className="w-full h-full border-separate">
                <thead className="w-full">
                    <tr className="sticky top-0">
                        {
                            columns.map((column, index) => {
                                return (
                                    <th key={index} className={`font-semibold border-1 border-white rounded-md py-2 px-4 overflow-hidden bg-gray-200`}>
                                        {column}
                                    </th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody className="">
                    {
                        dataset.map((row: DataRow, rindex) => {
                            return (
                                <tr key={`r${rindex}`}>
                                    {
                                        columns.map((column, dindex) => {
                                            return (
                                                <td key={`d${rindex}-${dindex}`} className={`text-center border-1 border-white rounded-md py-1 bg-gray-100`}>
                                                    {row[column]}
                                                </td>
                                            );   
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}