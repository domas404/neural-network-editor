"use client";

import { updateSelectedTargets } from "@/app/lib/redux/features/dataset-slice";
import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { useDispatch } from "react-redux";

export default function TargetList() {

    const targets = useAppSelector((state) => state.datasetReducer.targets);
    const selectedTargets = useAppSelector((state) => state.datasetReducer.selectedTargets);
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const targetToChange = targets.indexOf(event.currentTarget.value);
        const updatedTargets = selectedTargets.map((target, index) => {
            if (index === targetToChange) {
                return !target;
            } else {
                return target;
            }
        });
        dispatch(updateSelectedTargets(updatedTargets));
    }

    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="bg-white text-base font-bold uppercase">
                        Targets
                    </div>
                    <div className="uppercase text-gray-500 tracking-wider -mt-2">
                        <span className="text-xs font-bold">
                            {selectedTargets.filter(Boolean).length}/{targets.length}
                        </span>
                        <span className="text-xs font-semibold pl-1">selected</span>
                    </div>
                    <div className="flex flex-col gap-px text-sm text-justify leading-5 hyphens-auto bg-gray-200 max-h-48 overflow-scroll">
                        {
                            targets.map((target, index) => {
                                return (
                                    <div key={target} className="bg-white py-2">
                                        <input
                                            id={target}
                                            type="checkbox"
                                            name="targets"
                                            className="mr-2"
                                            value={target}
                                            checked={selectedTargets[index]}
                                            onChange={handleChange}
                                        />
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
