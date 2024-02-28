import "@/app/globalicons.css";
import DatasetList from '@/app/ui/dataset/dataset-list';
import InfoMenu from "@/app/ui/model/info-menu";
import TargetList from "@/app/ui/dataset/target-list";
import FeatureList from "@/app/ui/dataset/feature-list";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Data | Multilayer Perceptron',
}

export default function Home() {
    return (
        <main className="h-full flex w-full">
            <div className="basis-11/12 flex flex-row gap-3 justify-stretch grow">
                <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48 h-full">
                    <div className="bg-white rounded-xl shadow-md h-full">
                        <DatasetList />
                    </div>
                </div>

                <div className="basis-2/3 bg-white rounded-xl shadow-md grow">

                </div>

                <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                    <div className="basis-1/3 bg-white rounded-xl shadow-md">
                        <InfoMenu objectName="Dataset" />
                    </div>
                    <div className="basis-1/3 bg-white rounded-xl shadow-md">
                        <FeatureList features={["petal-length", "petal-width", "sepal-length", "sepal-width"]} />
                    </div>
                    <div className="basis-1/3 bg-white rounded-xl shadow-md">
                        <TargetList targets={["setosa", "versicolor", "virginica"]} />
                    </div>
                </div>
            </div>
        </main>
    );
}
