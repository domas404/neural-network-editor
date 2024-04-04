export default function ExportModel() {
    return (
        <div className="flex rounded-md shadow-sm h-full bg-white border dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 w-full">
                <div className="flex justify-between px-6">
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        Download
                    </div>
                </div>
                <div className="my-2 text-md px-4">
                    <div className="flex flex-col bg-gray-200 mt-4 dark:bg-slate-700">
                        <div className="bg-white dark:bg-slate-800">
                            <div className="rounded-lg hover:bg-slate-100 hover:cursor-pointer p-2 dark:hover:bg-slate-700
                                active:bg-slate-200 dark:active:bg-slate-600">
                                <div className="text-sm dark:text-white">Model parameters</div>
                                <div className="flex flex-row items-center gap-1 text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined md-20">
                                        code
                                    </span>
                                    <div className="font-semibold tracking-wider text-xs">JSON</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800">
                            <div className="rounded-lg hover:bg-slate-100 hover:cursor-pointer p-2 dark:hover:bg-slate-700
                                active:bg-slate-200 dark:active:bg-slate-600">
                                <div className="text-sm dark:text-white">Accuracy plot</div>
                                <div className="flex flex-row items-center gap-1 text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined md-20">
                                        image
                                    </span>
                                    <div className="font-semibold tracking-wider text-xs">PNG</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800">
                            <div className="rounded-lg hover:bg-slate-100 hover:cursor-pointer p-2 dark:hover:bg-slate-700
                                active:bg-slate-200 dark:active:bg-slate-600">
                                <div className="text-sm dark:text-white">Loss plot</div>
                                <div className="flex flex-row items-center gap-1 text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined md-20">
                                        image
                                    </span>
                                    <div className="font-semibold tracking-wider text-xs">PNG</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800">
                            <div className="rounded-lg hover:bg-slate-100 hover:cursor-pointer p-2 dark:hover:bg-slate-700
                                active:bg-slate-200 dark:active:bg-slate-600">
                                <div className="text-sm dark:text-white">Neural network graph</div>
                                <div className="flex flex-row items-center gap-1 text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined md-20">
                                        image
                                    </span>
                                    <div className="font-semibold tracking-wider text-xs">PNG</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}