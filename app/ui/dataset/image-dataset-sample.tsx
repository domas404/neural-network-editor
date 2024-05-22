"use client";

import allDatasets from "@/app/lib/all-datasets";
import { shuffleDataRows } from "@/app/lib/redux/features/dataset-slice";
import { useAppSelector, AppDispatch } from "@/app/lib/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";

import {MnistData} from "@/app/lib/data-mnist";
import {showExamples} from "@/app/lib/image-data-utils";
import { PlaygroundSkeleton } from "../misc/skeletons";

export default function ImageDatasetSample() {

    const dataset = useAppSelector((state) => state.datasetReducer);
    const datasetId = useAppSelector((state) => state.networkReducer.dataset);
    const [selectedDataset, setSelectedDataset] = useState(dataset[allDatasets[0].id]);
    const dispatch = useDispatch<AppDispatch>();
    const [images, setImages] = useState<HTMLCanvasElement[]>([]);
    const [labels, setLabels] = useState<[[]]>([[]]);
    const [mappedImages, setMappedImages] = useState<JSX.Element[]>([]);

    async function getData() {
        const data = new MnistData();
        await data.load();
        const [imageArray, labelArray] = await showExamples(data);
        setImages(imageArray);
        setLabels(labelArray);
    }

    const handleShuffle = () => {
        getData();
    }

    useEffect(() => {
        if (images.length === 0)
            getData();
    }, []);

    useEffect(() => {
        setSelectedDataset(dataset[datasetId]);
    }, [datasetId, dataset]);

    useEffect(() => {
        if (images) {
            const mappedImagesToSet = images.map((item, index) => {
                const src = item.toDataURL();
                const label = labels[index].findIndex((item) => item === 1);
                return (
                    <div key={index} className="flex items-center flex-col">
                        <Image src={src} alt="" width={112} height={112} />
                        {/* <div className="w-28 h-28 bg-blue-300">{item}</div> */}
                        <div className="my-1 w-28 bg-blue-100 text-center dark:bg-slate-600 dark:text-white">{label}</div>
                    </div>
                );
            });
            setMappedImages(mappedImagesToSet);
        }
    }, [images]);

    return (
        <>
            <div className="flex justify-between w-full text-sm mb-2 items-center">
                <div className="uppercase tracking-wider font-semibold text-right text-slate-600 dark:text-slate-300">
                    Showing {images.length} items
                </div>
                <button className="py-1 px-2 uppercase tracking-wider font-semibold rounded-md bg-slate-100 border text-lightblue-900
                    hover:cursor-pointer hover:bg-lightblue-100 active:bg-lightblue-200
                    dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200
                    dark:hover:bg-slate-600 dark:hover:border-slate-500
                    dark:active:bg-slate-500 dark:active:border-slate-400"
                    onClick={() => handleShuffle()}
                >
                    Shuffle
                </button>
            </div>
            <div id="image-canvas" className="w-full h-full overflow-scroll flex flex-row gap-2 p-2 flex-wrap">
                {images.length === 0 ? <PlaygroundSkeleton /> : mappedImages}
            </div>
        </>
    );
}