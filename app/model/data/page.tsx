import { Metadata } from "next";
import DatasetMain from "@/app/ui/dataset/dataset-main";

export const metadata: Metadata = {
    title: 'Data | Multilayer Perceptron',
}

export default function Home() {
    return (
        <main className="h-full flex w-full">
            <DatasetMain dataType="tabular" />
        </main>
    );
}
