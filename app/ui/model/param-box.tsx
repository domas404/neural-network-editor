import "@/app/globalicons.css";
import React, { memo } from "react";

interface ParamProps {
    paramType: string;
    paramName: string;
    paramOptions: string[];
    handleChange: any;
    defaultVal: any;
}

const ParamBox = ({ handleChange, paramType, paramName, paramOptions, defaultVal }: ParamProps) => {

    const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
        handleChange(paramType, event.currentTarget.value);
    }

    return (
        <div className="py-3 bg-white mb-px">
            <label className="flex flex-row group items-center pb-1" htmlFor={paramName}>
                <div className="text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider">
                    {paramName}
                </div>
                <div className="flex items-center select-none invisible px-2 group-hover:visible text-gray-300 hover:cursor-pointer hover:text-gray-400 active:text-gray-500">
                    <span className="material-symbols-outlined md-20">
                        info
                    </span>
                </div>
            </label>
            <select
                name={paramName}
                className="bg-gray-100 py-2.5 px-4 text-sm rounded-lg w-full"
                onChange={handleSelectChange}
                defaultValue={defaultVal}
            >
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

export default memo(ParamBox);
