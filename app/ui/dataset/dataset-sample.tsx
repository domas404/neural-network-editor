"use client";

import { useAppSelector } from "@/app/lib/redux/store";

export default function DatasetSample() {

    const dataset = useAppSelector((state) => state.datasetReducer.dataset);
    const columns = useAppSelector((state) => state.datasetReducer.columns);

    return (
        <div className="h-96 overflow-scroll">
            <table className="">
                <thead className="">
                    <tr>
                        {
                            columns.map((column, index) => {
                                return (
                                    <th key={index} className={`font-semibold border-2 border-white rounded-lg py-2 px-4 overflow-hidden bg-gray-200`}>
                                        {column}
                                    </th>
                                );
                            })
                        }
                    </tr>
                </thead>
                <tbody className="">
                    {
                        dataset.map((row, rindex) => {
                            return (
                                <tr key={`r${rindex}`}>
                                    {
                                        columns.map((column, dindex) => {
                                            return (
                                                <td key={`d${rindex}-${dindex}`} className={`text-center border-2 border-white rounded-lg py-1 bg-gray-100`}>
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