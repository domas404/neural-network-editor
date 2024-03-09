"use client";

import { AppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { updateSelectedFeatures } from "@/app/lib/redux/features/dataset-slice";
import { useDispatch } from "react-redux";

export default function FeatureList() {

    const features = useAppSelector((state) => state.datasetReducer.features);
    const selectedFeatures = useAppSelector((state) => state.datasetReducer.selectedFeatures);
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const targetToChange = features.indexOf(event.currentTarget.value);
        const updatedTargets = selectedFeatures.map((feature, index) => {
            if (index === targetToChange) {
                return !feature;
            } else {
                return feature;
            }
        });
        dispatch(updateSelectedFeatures(updatedTargets));
    }

    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex flex-col">
                    <div className="bg-white text-base font-bold uppercase">
                        Features
                    </div>
                    <div className="uppercase text-gray-500 tracking-wider -mt-2">
                        <span className="text-xs font-bold">
                            {selectedFeatures.filter(Boolean).length}/{features.length}
                        </span>
                        <span className="text-xs font-semibold pl-1">selected</span>
                    </div>
                    <div className="flex flex-col gap-px text-sm text-justify leading-5 hyphens-auto bg-gray-200 max-h-48 overflow-scroll">
                        {
                            features.map((feature, index) => {
                                return (
                                    <div key={feature} className="bg-white py-2">
                                        <input
                                            id={feature}
                                            type="checkbox"
                                            name="features"
                                            className="mr-2"
                                            value={feature}
                                            checked={selectedFeatures[index]}
                                            onChange={handleChange}
                                        />
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
