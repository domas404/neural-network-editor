"use client";

import Dataset from '@/app/ui/model/dataset';
import Parameters from "@/app/ui/model/parameters";
import Models from "@/app/ui/model/models";
import InfoMenu from "@/app/ui/model/info-menu";
import Layers from "@/app/ui/model/layers";
import Playground from "@/app/ui/model/playground";
import TrainButton from "@/app/ui/model/train-button";
import React, { useState, createContext } from "react";
import { Network, ModelSet } from "@/app/lib/data-types";
import { InitialModels } from "@/app/lib/initial-model";

const initialNetwork: Network = {
    dataset: 'iris',
    modelId: 'default',
    hyperparams: {
        epochs: 1,
        learningRate: 0.1,
        batchSize: 1,
        optimizer: "SGD",
    }
};

interface ContextType {
    network: Network,
    setNetwork: React.Dispatch<React.SetStateAction<Network>>,
    models: ModelSet,
    updateNetworkModel: (event: React.FormEvent<HTMLInputElement>) => void
}

export const NetworkContext = createContext<ContextType | undefined>(undefined);

export default function Home() {

    const [network, setNetwork] = useState<Network>(initialNetwork);
    const [models, setModels] = useState(InitialModels);
    // const [datasets, setDatasets] = useState();

    const updateNetworkModel = (event: React.FormEvent<HTMLInputElement>) => {
        setNetwork({
            ...network,
            modelId: event.currentTarget.value
        });
    }

    return (
        <div className="basis-11/12 flex flex-row gap-3 justify-stretch grow">
            <NetworkContext.Provider value={{ network, setNetwork, models, updateNetworkModel }}>
                <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                    <div className="basis-1/6 bg-white rounded-xl shadow-md">
                        <Dataset />
                    </div>
                    <div className="basis-2/3 bg-white rounded-xl shadow-md">
                        <Parameters />
                    </div>
                    <div className="basis-1/6 bg-white rounded-xl shadow-md">
                        <Models />
                    </div>
                </div>
                <div className="basis-2/3 bg-white rounded-xl shadow-md grow">
                    <Playground />
                </div>
                <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                    <div className="basis-5/12 bg-white rounded-xl shadow-md">
                        <InfoMenu objectName="Hidden layer #1" toDisplay="layer" />
                    </div>
                    <div className="basis-1/2 bg-white rounded-xl shadow-md grow">
                        <Layers />
                    </div>
                    <TrainButton />
                </div>
            </NetworkContext.Provider>
        </div>
    );
}
