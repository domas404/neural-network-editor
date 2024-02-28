import "@/app/globalicons.css";
import Image from 'next/image';
import fullyConnectedLayer from "@/public/fully-connected.png";

export default function Layers() {
    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="bg-white text-base font-bold uppercase">
                        Layers
                    </div>
                    <div className="flex flex-col bg-gray-200 gap-px mt-4">
                        <div className="bg-white">
                            <div className="flex flex-row items-center rounded-xl select-none hover:cursor-grab hover:bg-gray-100 p-2">
                                <div className="">
                                    <Image src={fullyConnectedLayer} width={36} height={36} alt="" />
                                </div>
                                <div className="ml-1 text-sm">Fully-connected</div>
                            </div>
                        </div>
                        <div className="bg-white">
                            <div className="flex flex-row items-center rounded-xl select-none hover:cursor-grab hover:bg-gray-100 p-2">
                                <div className="">
                                    <Image src={fullyConnectedLayer} width={36} height={36} alt="" className="select-none" />
                                </div>
                                <div className="ml-1 text-sm">Some other layer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
