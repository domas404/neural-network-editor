import "@/app/globalicons.css";

export default function Settings() {
    return (
        <div className="basis-1/3 flex justify-end">
            <div className="flex items-center bg-white  shadow-lg h-8 rounded-lg select-none px-1">
                <div className="flex flex-row justify-between gap-px bg-gray-200">
                    <div className="flex items-center justify-center bg-white w-8">
                        <span className="material-symbols-outlined">
                            light_mode
                        </span>
                    </div>
                    <div className="flex items-center justify-center bg-white w-8 font-bold text-sm">
                        <span>EN</span>
                    </div>
                    <div className="flex items-center justify-center bg-white w-8 font-bold text-sm">
                        <span>?</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
