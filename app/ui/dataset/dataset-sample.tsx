"use client";

import React, { useState, useEffect } from "react";

export default function DatasetSample() {

    const [dataset, setDataset] = useState([{}]);
    const [columns, setColumns] = useState<string[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            res.json().then((data) => {
                setDataset(data);
            })
        });
    }, []);

    useEffect(() => {
        let datasetColumns = Object.keys(dataset[0]);
        setColumns(datasetColumns);
    }, [dataset]);

    return (
        <div className="h-96 overflow-scroll">
            <table className="">
                <thead>
                    <tr>
                        {
                            columns.map((column, index) => {
                                return (
                                    <th key={index} className={`font-semibold border-2 border-white rounded-lg py-1 px-4 overflow-hidden bg-gray-200`}>
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