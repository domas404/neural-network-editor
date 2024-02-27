import "@/app/globalicons.css";
import Dataset from '@/app/ui/model/dataset';
import Parameters from "@/app/ui/model/parameters";
import Models from "@/app/ui/model/models";
import InfoMenu from "@/app/ui/model/info-menu";
import Layers from "@/app/ui/model/layers";
import Playground from "@/app/ui/model/playground";
import TrainButton from "@/app/ui/model/train-button";
import type { Metadata } from 'next'
// import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Model | Multilayer Perceptron',
}



export default function Home() {

    // const [model, setModel] = useState(initialModel);

    return (
        <main className="h-full flex w-full">
            <div className="basis-11/12 flex flex-row gap-3 justify-stretch grow">
                <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                    <div className="basis-1/6 bg-white rounded-xl shadow-md">
                        <Dataset datasetNames={["Iris data", "Placeholder", "Dataset"]} chosenDataset="Iris data" />
                    </div>
                    <div className="basis-2/3 bg-white rounded-xl shadow-md">
                        <Parameters />
                    </div>
                    <div className="basis-1/6 bg-white rounded-xl shadow-md">
                        <Models modelNames={["My Model", "Default"]} />
                    </div>
                </div>

                <div className="basis-2/3 bg-white rounded-xl shadow-md grow">
                    <Playground />
                </div>

                <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                    <div className="basis-5/12 bg-white rounded-xl shadow-md">
                        <InfoMenu objectName="Neural Network" />
                    </div>
                    <div className="basis-1/2 bg-white rounded-xl shadow-md grow">
                        <Layers />
                    </div>
                    <TrainButton />
                </div>
            </div>
        </main>
    );
}
