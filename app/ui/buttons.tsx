import "@/app/globalicons.css";

interface LinkToPageButtonProps {
    archType: string,
}

export function LinkToPageButton({ archType }: LinkToPageButtonProps) {
    return (
        <div className="flex flex-row items-center justify-center h-24 w-64 rounded-2xl select-none
            bg-stone-100 shadow-lg shadow-gray-200 
            hover:cursor-pointer hover:bg-blue-100
            active:bg-blue-200 active:shadow-md">
            <div className="flex flex-row items-center justify-center w-1/4">
                <span className="material-symbols-outlined">
                    workspaces
                </span>
            </div>
            <div className="text-base max-w-44 font-semibold w-3/4 leading-5 uppercase pr-4">
                {archType}
            </div>
        </div>
    );
}
