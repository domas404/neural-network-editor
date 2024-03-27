export default function ExportModel() {
    return (
        <div className="flex rounded-md shadow-sm h-full bg-white border dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        Export
                    </div>
                </div>
                <div className="my-2 text-md">
                    <div className="flex flex-col bg-gray-200 gap-px mt-4 dark:bg-slate-700">
                        <div className="bg-white dark:bg-slate-800">
                            <div className="rounded-lg hover:bg-gray-100 hover:cursor-pointer p-2 dark:hover:bg-slate-700">
                                <div className="text-sm dark:text-white">Model parameters</div>
                                <div className="text-slate-600 font-semibold tracking-wider text-xs dark:text-slate-400">JSON</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800">
                            <div className="rounded-lg hover:bg-gray-100 hover:cursor-pointer p-2 dark:hover:bg-slate-700">
                                <div className="text-sm dark:text-white">Accuracy plot</div>
                                <div className="text-slate-600 font-semibold tracking-wider text-xs dark:text-slate-400">PNG</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800">
                            <div className="rounded-lg hover:bg-gray-100 hover:cursor-pointer p-2 dark:hover:bg-slate-700">
                                <div className="text-sm dark:text-white">Loss plot</div>
                                <div className="text-slate-600 font-semibold tracking-wider text-xs dark:text-slate-400">PNG</div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800">
                            <div className="rounded-lg hover:bg-gray-100 hover:cursor-pointer p-2 dark:hover:bg-slate-700">
                                <div className="text-sm dark:text-white">Neural network graph</div>
                                <div className="text-slate-600 font-semibold tracking-wider text-xs dark:text-slate-400">PNG</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}