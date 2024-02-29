import "@/app/globalicons.css";
import Param from "@/app/ui/model/param-box";

interface LayerInfoProps {
    objectName: string;
}

export default function LayerInfo() {

    const handleChange = (paramType: string, value: number | string) => {
        console.log(paramType, value);
    }

    return (
        <div>
            <Param
                handleChange={handleChange}
                defaultVal={"Sigmoid"}
                paramType={"activation"}
                paramName={"activation"}
                paramOptions={["Sigmoid", "tanH", "ReLU"]}
            />
            <div>
                <div className="text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider pb-1">Neurons</div>
                <div className="bg-gray-100 py-2.5 px-4 text-sm rounded-lg w-28 h-10 flex flex-row items-center justify-between">
                    <div className="h-full mx-1">
                        <span>5</span>
                    </div>
                    <div className="flex">
                        <button className="select-none flex items-center">
                            <span className="material-symbols-outlined">
                                add
                            </span>
                        </button>
                        <button className="select-none flex items-center">
                            <span className="material-symbols-outlined">
                                remove
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
