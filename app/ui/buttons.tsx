import "@/app/globalicons.css";

interface LinkToPageButtonProps {
    archType: string,
    archDesc: string
}

export function LinkToPageButton({ archType, archDesc }: LinkToPageButtonProps) {
    return (
        <div className="flex flex-col items-center justify-center h-32 w-80 rounded-xl select-none border shadow-sm bg-slate-100
            hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300 px-6
            dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500"
        >
            <div className="flex flex-row items-center justify-between w-full">
                <div className="text-base font-semibold leading-5 uppercase dark:text-white">
                    {archType}
                </div>
                <div className="flex flex-row items-center justify-center">
                    <span className="material-symbols-outlined dark:text-white">
                        arrow_forward
                    </span>
                </div>
            </div>
            <div className="text-slate-700 dark:text-slate-400 text-sm mt-1 w-full">
                {archDesc}
            </div>
        </div>
    );
}
