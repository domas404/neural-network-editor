import "@/app/globalicons.css";
import Image from 'next/image';
import fullyConnectedLayer from "@/public/fully-connected.png";

export default function Layers() {

    // const onDragStart = (event: React.DragEvent, nodeType: any) => {
    //     event.dataTransfer.setData('application/reactflow', nodeType);
    //     event.dataTransfer.effectAllowed = 'move';
    // };

    return (
        <div className="bg-white flex rounded-md shadow-sm border h-full dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        Layers
                    </div>
                    <div className="flex flex-col bg-gray-200 gap-px mt-4 dark:bg-slate-700">
                        <div className="bg-white dark:bg-slate-800">
                            <div
                                // onDragStart={(event) => onDragStart(event, "input")}
                                draggable
                                className="flex flex-row items-center rounded-lg select-none hover:cursor-grab hover:bg-gray-100 p-2
                                dark:hover:bg-slate-700"
                            >
                                <div className="">
                                    <Image src={fullyConnectedLayer} width={36} height={36} alt="" draggable={false} />
                                </div>
                                <div className="ml-1 text-sm dark:text-white">Fully-connected</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
