import { Metadata } from "next";
import TrainMain from "@/app/ui/train/train-main";

export const metadata: Metadata = {
    title: 'Train | Multilayer Perceptron',
}

export default function Home() {
    return (
        <main className="h-full flex w-full">
            <TrainMain />
        </main>
    );
}
