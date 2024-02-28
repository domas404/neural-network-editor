"use client";

import "@/app/globalicons.css";
import Dataset from '@/app/ui/model/dataset';
import Parameters from "@/app/ui/model/parameters";
import Models from "@/app/ui/model/models";
import InfoMenu from "@/app/ui/model/info-menu";
import Layers from "@/app/ui/model/layers";
import Playground from "@/app/ui/model/playground";
import TrainButton from "@/app/ui/model/train-button";
import React, { useState, createContext, useEffect } from "react";
import { Network, ModelSet } from "@/app/lib/data-types";
import { v4 } from "uuid";

const defaultModel: ModelSet = {
    'default': {
        name: 'Default',
        layers: [
            {
                id: v4(),
                type: "input",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }, { id: v4() }]
            },
            {
                id: v4(),
                type: "hidden",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }]
            },
            {
                id: v4(),
                type: "output",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }]
            },
        ]
    }
};

const myModel: ModelSet = {
    'mymodel': {
        name: 'My Model',
        layers: [
            {
                id: v4(),
                type: "input",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }, { id: v4() }]
            },
            {
                id: v4(),
                type: "hidden",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }, { id: v4() }, { id: v4() }]
            },
            {
                id: v4(),
                type: "hidden",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }, { id: v4() }]
            },
            {
                id: v4(),
                type: "output",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }]
            },
        ]
    }
};

// const initialModelArray: ModelSet = { ...defaultModel, ...myModel };

// console.log(initialModelArray["default"]);

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

export const NetworkContext = createContext(null);

export default function Home() {

    const [network, setNetwork] = useState<Network>(initialNetwork);
    const [models, setModels] = useState({ ...defaultModel, ...myModel });
    const [datasets, setDatasets] = useState();

    const updateNetworkModel = (event) => {
        setNetwork({
            ...network,
            modelId: event.target.value
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
                        <InfoMenu objectName="Hidden layer #1" />
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
