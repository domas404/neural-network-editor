"use client";

interface DataSampleProps {
    dataset: [{}],
    columns: string[]
}

export default function DatasetSample({ dataset, columns }: DataSampleProps) {

    return (
        <div className="h-96 overflow-scroll">
            <table className="">
                <thead>
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
                <tbody>
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