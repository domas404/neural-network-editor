import "./globalicons.css";
import Settings from '@/app/ui/settings';
import Logo from '@/app/ui/nne-logo';
import NeuralNetworkType from '@/app/ui/nn-type-button';
import Link from 'next/link';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Home | Neural Network Editor',
}

export default function Home() {
    return (
        <main className="h-full grid grid-cols-8 grid-rows-10 p-4">
            <div className="col-span-8 flex flex-row items-center justify-between p-8">
                <Logo iconSize="large" archType="" />
                <Settings />
            </div>
            <div className="col-start-2 col-span-2 row-span-9 row-start-2 p-4 flex flex-col justify-center gap-4">
                <div className="my-4">
                    <div className="text-4xl font-bold text-left">Neural networks made easy.</div>
                    <div className="pt-2 text-lg text-gray-600 text-left">Choose a neural network to start building.</div>
                </div>
                <div className="flex flex-col h-2/3 gap-6">
                    <Link href="/model">
                        <NeuralNetworkType archType="Multilayer Perceptron" />
                    </Link>
                    <Link href="/">
                        <NeuralNetworkType archType="Convolutional Neural Network" />
                    </Link>
                </div>
            </div>
            <div className="col-span-4 row-span-9 row-start-2 bg-stone-100 rounded-xl p-4">
                <div></div>
            </div>
        </main>
    );
}
