"use client";

import Flow from "./network-flow"
import { useAppSelector } from '@/app/lib/redux/store';

export default function Playground() {

    const datasetId = useAppSelector((state) => state.networkReducer.dataset);
    const datasetLoaded = useAppSelector((state) => state.datasetReducer[datasetId].loaded);

    return (
        <>
            <div className="flex rounded-xl shadow-sm h-full">
                <div className="w-full">
                    <div className="flex flex-col h-full w-full relative">
                        <div className="flex flex-row h-full w-full justify-center items-center absolute top-0 text-sm leading-5 overflow-scroll">
                            { datasetLoaded && <Flow /> }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
