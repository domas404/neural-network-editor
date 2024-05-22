import "./globalicons.css";
import Settings from '@/app/ui/settings';
import Logo from '@/app/ui/logo';
import { LinkToPageButton } from '@/app/ui/buttons';
import Link from 'next/link';
import type { Metadata } from 'next';
import AppUILight from "@/public/app-ui-light.png";
import ModelUIDark from "@/public/app-ui-model-dark.png";
import DataUIDark from "@/public/app-ui-data-dark.png";
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Home | Neural Network Editor',
}

export default function Home() {
    return (
        <main className="h-full flex flex-col dark:bg-slate-900">
            <div className="z-20 h-16 flex flex-row items-center justify-between p-4 m-4">
                <Logo iconSize="large" archType="" />
                <Settings />
            </div>
            <div className="relative h-full w-full flex">
                <div className="z-10 opacity-20 absolute pointer-events-none bg-slate-300 dark:bg-slate-700 h-full w-full"></div>
                <div className="z-20 w-full h-full flex flex-row mx-48 items-center mb-20">
                    <div className="w-1/2 min-w-96 flex flex-col justify-center">
                        <div className="text-4xl font-bold text-left dark:text-white">Learn neural networks</div>
                        <div className="pt-2 text-lg text-slate-600 text-left dark:text-slate-300 pr-12">
                            Neural network editor is an educational tool for learning the basics of neural networks
                            by visually creating and training models. Choose a neural network to begin.
                        </div>
                        <div className="z-20 flex flex-col gap-6 mt-6">
                            <Link href="/model" >
                                <LinkToPageButton archType="Multilayer Perceptron" archDesc="Classification of iris, penguin and wine datasets." />
                            </Link>
                            <Link href="/cnn" >
                                <LinkToPageButton archType="Convolutional Neural Network" archDesc="Classification of MNIST handwritten digit dataset." />
                            </Link>
                        </div>
                    </div>
                    <div className="z-20 relative h-3/4 w-1/2">
                        <Image src={DataUIDark} alt="" fill={true} className="-mt-8 pointer-events-none" style={{objectFit: "contain"}} />
                        <Image src={ModelUIDark} alt="" fill={true} className="mt-12 ml-20 pointer-events-none" style={{objectFit: "contain"}} />
                    </div>
                </div>
            </div>            
        </main>
    );
}
