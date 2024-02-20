import "@/app/globalicons.css";
import Dataset from '@/app/ui/model/dataset';
import Parameters from "@/app/ui/model/parameters";
import Models from "@/app/ui/model/models";
import InfoMenu from "@/app/ui/model/info-menu";
import Layers from "@/app/ui/model/layers";
import Playground from "@/app/ui/model/playground";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Multilayer Perceptron | Neural Network Editor',
}

export default function Home() {
    return (
        <main className="h-full flex w-full">
            <div className="basis-11/12 flex flex-row gap-3 justify-stretch grow">
                <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                    <div className="basis-1/6 bg-white rounded-xl shadow-md">
                        <Dataset datasetNames={["Iris data", "Placeholder"]} chosenDataset="Iris data" />
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
                    <div className="basis-1/2 bg-white rounded-xl shadow-md">
                        <Layers />
                    </div>
                    <button className="bg-black text-white p-2 rounded-lg uppercase font-semibold hover:bg-gray-900 active:text-sky-600">
                        Train
                    </button>
                </div>
            </div>
        </main>
    );
}
