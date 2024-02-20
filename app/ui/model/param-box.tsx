import "@/app/globalicons.css";

interface ParamProps {
    paramType: string;
    paramOptions: string[];
}

export default function ParamBox({ paramType, paramOptions }: ParamProps) {
    return (
        <div className="py-3 bg-white mb-px">
            <label className="flex flex-row group">
                <div className="text-sm font-semibold pl-2">
                    {paramType}
                </div>
                <div className="select-none invisible align-top px-2 group-hover:visible text-gray-300 hover:cursor-pointer hover:text-gray-400 active:text-gray-500">
                    <span className="material-symbols-outlined md-20">
                        info
                    </span>
                </div>
            </label>
            <select className="bg-gray-100 py-2.5 px-4 text-sm rounded-lg w-full">
                {
                    paramOptions.map((option) => {
                        return (
                            <option key={option} value={option} className="font-sans">{option}</option>
                        );
                    })
                }
            </select>
        </div>
    );
}
