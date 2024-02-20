import "@/app/globalicons.css";

interface ArchitectureProps {
    archType: string;
}

export default function NNArchitecture({ archType }: ArchitectureProps) {
    return (
        <div className="flex flex-row items-center justify-center h-24 bg-stone-100 rounded-2xl shadow-lg shadow-gray-200 w-64
        hover:cursor-pointer active:bg-stone-200 active:shadow-md select-none border-4 border-stone-100 hover:border-sky-600">
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
