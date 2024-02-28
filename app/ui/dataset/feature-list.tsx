import "@/app/globalicons.css";

import LayerInfo from "@/app/ui/model/info-menu-templates/layer-info";
// import Layer from "./layer";

interface InfoMenuProps {
    features: string[];
}

export default function FeatureList({ features }: InfoMenuProps) {
    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="bg-white text-base font-bold uppercase">
                        Features
                    </div>
                    <div className="uppercase text-gray-500 tracking-wider -mt-2">
                        <span className="text-xs font-bold">4/4</span>
                        <span className="text-xs font-semibold pl-1">selected</span>
                    </div>
                    <div className="flex flex-col gap-px text-sm text-justify leading-5 hyphens-auto bg-gray-200 max-h-48 overflow-scroll">
                        {
                            features.map((feature) => {
                                return (
                                    <div key={feature} className="bg-white py-2">
                                        <input id={feature} type="checkbox" name="features" className="mr-2" />
                                        <label htmlFor={feature} className="hover:cursor-pointer">{feature}</label>
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
