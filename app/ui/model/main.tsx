"use client";

import Dataset from '@/app/ui/model/dataset';
import Parameters from "@/app/ui/model/parameters";
import Models from "@/app/ui/model/models";
import InfoMenu from "@/app/ui/model/info-menu";
import Layers from "@/app/ui/model/layers";
import Playground from "@/app/ui/model/playground";
import TrainButton from "@/app/ui/model/train-button";

export default function Home() {
    return (
        <div className="basis-11/12 flex flex-row gap-3 justify-stretch grow">
            <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                <div className="basis-1/6 bg-white rounded-xl shadow-md border">
                    <Dataset />
                </div>
                <div className="basis-2/3 bg-white rounded-xl shadow-md border">
                    <Parameters />
                </div>
                <div className="basis-1/6 bg-white rounded-xl shadow-md border">
                    <Models />
                </div>
            </div>
            <div className="basis-2/3 bg-white rounded-xl shadow-md grow border">
                <Playground />
            </div>
            <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                <div className="basis-5/12 bg-white rounded-xl shadow-md border">
                    <InfoMenu />
                </div>
                <div className="basis-1/2 bg-white rounded-xl shadow-md grow border">
                    <Layers />
                </div>
                <TrainButton />
            </div>
        </div>
    );
}
