"use client";

import DatasetList from '@/app/ui/dataset/dataset-list';
import InfoMenu from "@/app/ui/model/info-menu";
import TargetList from "@/app/ui/dataset/target-list";
import FeatureList from "@/app/ui/dataset/feature-list";
import DatasetSample from "@/app/ui/dataset/dataset-sample";

import React, { useState, useEffect } from "react";

export default function DatasetMain() {

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
        <div className="basis-11/12 flex flex-row gap-3 justify-stretch grow">
            <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48 h-full">
                <div className="bg-white rounded-xl shadow-md h-full border">
                    <DatasetList />
                </div>
            </div>

            <div className="basis-2/3 bg-white rounded-xl shadow-md grow flex relative border">
                <div className="h-full w-full flex justify-center items-center absolute top-0">
                    <DatasetSample dataset={dataset} columns={columns} />
                </div>
                <div className="py-5 px-6 text-base z-0 font-bold uppercase">
                    Iris data
                </div>
            </div>

            <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                <div className="basis-1/3 bg-white rounded-xl shadow-md border">
                    <InfoMenu objectName="Dataset" toDisplay="concept" />
                </div>
                <div className="basis-1/3 bg-white rounded-xl shadow-md border">
                    <FeatureList features={columns.slice(1, -1)} />
                </div>
                <div className="basis-1/3 bg-white rounded-xl shadow-md border">
                    <TargetList targets={["setosa", "versicolor", "virginica"]} />
                </div>
            </div>
        </div>
    );
}