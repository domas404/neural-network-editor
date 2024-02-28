import "@/app/globalicons.css";

import LayerInfo from "@/app/ui/model/info-menu-templates/layer-info";
// import Layer from "./layer";

interface TargetProps {
    targets: string[];
}

export default function TargetList({ targets }: TargetProps) {
    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="bg-white text-base font-bold uppercase">
                        Targets
                    </div>
                    <div className="uppercase text-gray-500 tracking-wider -mt-2">
                        <span className="text-xs font-bold">3/3</span>
                        <span className="text-xs font-semibold pl-1">selected</span>
                    </div>
                    <div className="flex flex-col gap-px text-sm text-justify leading-5 hyphens-auto bg-gray-200 max-h-48 overflow-scroll">
                        {
                            targets.map((target) => {
                                return (
                                    <div key={target} className="bg-white py-2">
                                        <input id={target} type="checkbox" name="targets" className="mr-2" />
                                        <label htmlFor={target} className="hover:cursor-pointer">{target}</label>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
