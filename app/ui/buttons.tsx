import "@/app/globalicons.css";

interface LinkToPageButtonProps {
    archType: string,
}

export function LinkToPageButton({ archType }: LinkToPageButtonProps) {
    return (
        <div className="flex flex-row items-center justify-center h-24 w-64 rounded-xl select-none border shadow-sm bg-slate-100
            hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300
            dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500"
        >
            <div className="text-base max-w-44 font-semibold leading-5 uppercase dark:text-white">
                {archType}
            </div>
            <div className="flex flex-row items-center justify-center">
                <span className="material-symbols-outlined dark:text-white">
                    arrow_forward
                </span>
            </div>
        </div>
    );
}
