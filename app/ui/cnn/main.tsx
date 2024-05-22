"use client";

import Dataset from '@/app/ui/cnn/dataset-panel/dataset';
import Parameters from "@/app/ui/cnn/hyperparameter-panel/parameters";
import Models from "@/app/ui/cnn/model-panel/models";
import InfoMenu from "@/app/ui/cnn/info-menu-panel/info-menu";
import Layers from "@/app/ui/cnn/layers-panel/layers";
import Playground from "@/app/ui/cnn/playground/playground";
import TrainButton from "@/app/ui/cnn/train-button";
import { ReactFlowProvider } from 'reactflow';

export default function Home() {
    return (
        <div className="basis-11/12 flex flex-row gap-2 justify-stretch grow">
            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                <div className="basis-1/6">
                    <Dataset />
                </div>
                <div className="basis-2/3">
                    <Parameters />
                </div>
                <div className="basis-1/6">
                    <Models />
                </div>
            </div>
            <ReactFlowProvider>
                <div className="basis-2/3 grow min-w-[420px]">
                    <Playground />
                </div>
                <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                    <div className="basis-1/2">
                        <InfoMenu />
                    </div>
                    <div className="basis-5/12 grow">
                        <Layers />
                    </div>
                    <TrainButton />
                </div>
            </ReactFlowProvider>
        </div>
    );
}
