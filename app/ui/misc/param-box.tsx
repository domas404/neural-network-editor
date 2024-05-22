import "@/app/globalicons.css";
import React, { memo } from "react";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import descMap from "@/app/lib/descriptions";

interface ParamProps {
    paramType: string;
    paramName: string;
    paramOptions: string[];
    handleChange: any;
    defaultVal?: any;
    currentValue?: any;
}

const ParamBox = ({ handleChange, paramType, paramName, paramOptions, defaultVal, currentValue }: ParamProps) => {

    const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
        handleChange(paramType, event.currentTarget.value);
    }

    const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

    const closePopup = () => {
        setAnchor(null);
        document.removeEventListener("click", closePopup);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (anchor) {
            setAnchor(null);
        } else {
            setAnchor(event.currentTarget);
            document.addEventListener("click", closePopup);
        }
        // window.addEventListener("click", closePopup);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popup' : undefined;

    return (
        <div className="py-3 bg-white mb-px dark:bg-slate-800">
            <label className="flex flex-row group items-center pb-1" htmlFor={paramName}>
                <div
                    className="text-xs font-semibold pl-2 uppercase text-gray-600 tracking-wider leading-3
                    overflow-hidden text-ellipsis whitespace-nowrap dark:text-slate-200"
                    title={paramName}
                >
                    {paramName}
                </div>
                <button
                    className="flex items-center select-none invisible px-2 group-hover:visible text-gray-300
                        hover:cursor-pointer hover:text-gray-400 active:text-gray-500"
                    onClick={handleClick}
                >
                    <span className="material-symbols-outlined md-20">
                        info
                    </span>
                </button>
                <BasePopup
                    id={id}
                    open={open}
                    anchor={anchor}
                    disablePortal
                    className="z-50 rounded-lg font-sans font-medium text-sm mt-2 p-3 border border-solid border-slate-200
                    dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md text-slate-900 dark:text-slate-100
                    max-w-60"
                    placement="right-start"
                >
                    <div className="">{descMap.get(paramType)}</div>
                </BasePopup>
            </label>
            <select
                name={paramName}
                className="bg-gray-50 py-2.5 px-4 text-sm rounded-lg w-full border focus:border-blue-600
                    dark:bg-slate-700 dark:text-white dark:border-slate-600"
                onChange={handleSelectChange}
                defaultValue={defaultVal}
                value={currentValue}
            >
                {
                    paramOptions.map((option) => {
                        return (
                            <option
                                key={option}
                                value={option}
                                className="font-sans dark:text-white checked:bg-slate-200 dark:checked:bg-slate-600"
                            >
                                {option}
                            </option>
                        );
                    })
                }
            </select>
        </div>
    );
}

export default memo(ParamBox);
