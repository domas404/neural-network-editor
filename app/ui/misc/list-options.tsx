import { useRef, useEffect } from 'react';
import { useAppSelector } from '@/app/lib/redux/store';

interface RadioOptionProps {
    id: string,
    handleChange: any,
    isChecked: boolean,
    name: string,
    groupName: string
}

export function RadioOption({ id, handleChange, isChecked, name, groupName }: RadioOptionProps) {

    // const modelId = useAppSelector((state) => state.networkReducer);

    // const listOption = useRef<null | HTMLLabelElement>(null);

    const scrollIntoPlace = (event: React.MouseEvent<HTMLElement>) => {
        event.currentTarget.scrollIntoView({ behavior: 'smooth' });
    }

    // useEffect(() => {
    //     console.log(listOption);
    //     if (listOption.current !== null) {
    //         listOption.current.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }, [modelId]);

    return (
        <div key={id} className="flex-none list-none my-2">
            <input
                onChange={handleChange}
                type="radio"
                id={id}
                name={groupName}
                value={id}
                className="opacity-0 hidden peer"
                required
                checked={isChecked}
            />
            <label
                htmlFor={id}
                onClick={scrollIntoPlace}
                className="flex items-center justify-between rounded-full cursor-pointer h-8 px-4 border
                    text-black bg-slate-50 hover:bg-lightblue-50 hover:border-lightblue-100
                    peer-checked:text-lightblue-800 peer-checked:bg-blue-100 peer-checked:border-lightblue-100
                    dark:text-slate-100 dark:bg-slate-700 dark:border-slate-600
                    dark:hover:bg-slate-600 dark:hover:border-slate-500
                    dark:peer-checked:bg-slate-500 dark:peer-checked:text-slate-100 dark:peer-checked:border-slate-400"
                // ref={listOption}
                >
                <div className="flex justify-center items-center h-full font-semibold text-sm">
                    {name}
                </div>
            </label>
        </div>
    );
}

interface CheckboxOptionsProps {
    feature: string,
    selectedFeature: boolean,
    handleChange: any,
}

export function CheckboxOption({ feature, selectedFeature, handleChange }: CheckboxOptionsProps) {
    return (
        <div key={feature} className="bg-white py-2 dark:bg-slate-800 dark:text-white flex items-center gap-2">
            <input
                id={feature}
                type="checkbox"
                name="features"
                className="appearance-none w-5 h-5 border rounded-full peer
                bg-slate-50 border-slate-300
                hover:border-slate-400 hover:cursor-pointer
                active:border-slate-500
                checked:bg-sky-600 checked:border-sky-600
                checked:hover:opacity-80 checked:hover:border-sky-600
                checked:active:opacity-70
                dark:bg-slate-700 dark:border-slate-600 dark:hover:border-slate-500
                dark:active:border-slate-400"
                value={feature}
                checked={selectedFeature}
                onChange={handleChange}
            />
            <label htmlFor={feature} className="hover:cursor-pointer
                text-slate-600 peer-checked:text-black peer-hover:text-black
                dark:text-slate-300 dark:peer-checked:text-white dark:peer-hover:text-white">{feature}</label>
            <span className="material-symbols-outlined md-20 absolute pointer-events-none
                text-slate-200 peer-hover:text-slate-300
                peer-active:text-slate-400
                peer-checked:text-white peer-checked:peer-hover:text-white
                dark:text-slate-500 dark:peer-hover:text-slate-400 dark:peer-active:text-slate-300">
                check
            </span>
        </div>
    );
}