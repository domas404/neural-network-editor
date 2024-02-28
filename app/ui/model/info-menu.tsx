import "@/app/globalicons.css";

import LayerInfo from "@/app/ui/model/info-menu-templates/layer-info";
import Layer from "./layer";

interface InfoMenuProps {
    objectName: string;
}

export default function InfoMenu({ objectName }: InfoMenuProps) {
    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="bg-white text-base font-bold uppercase">
                        {objectName}
                    </div>
                    <div className="text-sm text-justify leading-5 mt-4 hyphens-auto">
                        <LayerInfo />
                    </div>
                </div>
            </div>
        </div>
    );
}
