"use client";

import DatasetList from '@/app/ui/dataset/dataset-list';
import TargetList from "@/app/ui/dataset/target-list";
import FeatureList from "@/app/ui/dataset/feature-list";
import DatasetSample from "@/app/ui/dataset/dataset-sample";

export default function DatasetMain() {
    return (
        <div className="basis-11/12 flex flex-row gap-2 justify-stretch grow">
            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48 h-full">
                <div className="bg-white rounded-lg shadow-xs h-full border">
                    <DatasetList />
                </div>
            </div>

            <div className="basis-2/3 bg-white rounded-lg shadow-xs grow flex relative border">
                <div className="w-full h-[500px] my-8 px-8 absolute top-8">
                    <DatasetSample />
                </div>
                <div className="py-5 px-6 text-base z-0 font-bold uppercase">
                    Dataset title
                </div>
            </div>

            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                <div className="basis-1/2 bg-white rounded-lg shadow-xs border">
                    <FeatureList />
                </div>
                <div className="basis-1/2 bg-white rounded-lg shadow-xs border">
                    <TargetList />
                </div>
            </div>
        </div>
    );
}