export const DatasetPanelSkeleton = () => {
    return (
        <>
            <div className="my-2">
                <div className="rounded-full h-8 px-4 bg-slate-200 dark:bg-slate-700">
                    <div className="w-16"></div>
                </div>
            </div>
            <div className="my-2">
                <div className="rounded-full h-8 px-4 bg-slate-200 dark:bg-slate-700">
                    <div className="w-16"></div>
                </div>
            </div>
        </>
    );
}

export const DatasetSkeleton = () => {
    return (
        <div className="bg-white flex rounded-md shadow-sm h-full border dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        Dataset
                    </div>
                </div>
                <div className="overflow-x-scroll flex flex-row h-14 items-center gap-2 animate-pulse">
                    <DatasetPanelSkeleton />
                </div>
            </div>
        </div>
    );
}

export const ParametersSkeleton = () => {
    return (
        <div className="h-full rounded-md shadow-sm bg-white border dark:bg-slate-800 dark:border-slate-700">
            <div className="flex flex-col py-5 px-1 w-full h-full">
                <div className="mx-5 shrink">
                    <div className="text-base font-bold uppercase text-ellipsis overflow-hidden dark:text-teal-100" title="Hyperparameters">
                        Hyperparameters
                    </div>
                </div>
                <div className="mx-1 mt-2 overflow-y-auto h-full animate-pulse">
                    <div className="mx-4 scrollable-container">
                        <div className="py-3">
                            <div className="rounded-full w-1/2 h-4 bg-slate-200 mb-2 dark:bg-slate-700"></div>
                            <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10 dark:bg-slate-700"></div>
                        </div>
                        <div className="py-4">
                            <div className="rounded-full w-1/2 h-4 bg-slate-200 mb-2 dark:bg-slate-700"></div>
                            <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10 dark:bg-slate-700"></div>
                        </div>
                        <div className="py-4">
                            <div className="rounded-full w-1/2 h-4 bg-slate-200 mb-2 dark:bg-slate-700"></div>
                            <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10 dark:bg-slate-700"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const ModelsSkeleton = () => {
    return (
        <div className="flex shadow-sm rounded-md h-full bg-white border dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        Models
                    </div>
                </div>
                <div className="overflow-x-scroll flex flex-row h-14 items-center gap-2 animate-pulse">
                    <DatasetPanelSkeleton />
                </div>
            </div>
        </div>
    );
}

export const PlaygroundSkeleton = () => {
    return (
        <div className="w-full h-full flex flex-row gap-2 justify-center items-center bg-white rounded-md border dark:bg-slate-800 dark:border-slate-700">
            <div
                className="inline-block h-6 w-6 border-slate-300 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            >
            </div>
            <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider dark:text-slate-300">Loading...</div>
        </div>
    );
}

export const InfoMenuSkeleton = () => {
    return (
        <div className="h-full rounded-md shadow-sm bg-white border dark:bg-slate-800 dark:border-slate-700">
            <div className="flex flex-col py-5 px-1 w-full h-full">
                <div className="mx-5 shrink">
                    <div className="text-base font-bold uppercase text-ellipsis overflow-hidden dark:text-teal-100" title="Hyperparameters">
                        Network
                    </div>
                </div>
                <div className="mx-1 mt-2 overflow-y-auto h-full animate-pulse">
                    <div className="mx-4 scrollable-container">
                        <div className="py-3">
                            <div className="rounded-full w-1/2 h-4 bg-slate-200 mb-2 dark:bg-slate-700"></div>
                            <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10 dark:bg-slate-700"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export const LayersSkeleton = () => {
    return (
        <div className="h-full rounded-md shadow-sm bg-white border dark:bg-slate-800 dark:border-slate-700">
            <div className="flex flex-col py-5 px-1 w-full h-full">
                <div className="mx-5 shrink">
                    <div className="text-base font-bold uppercase text-ellipsis overflow-hidden dark:text-teal-100" title="Hyperparameters">
                        Layers
                    </div>
                </div>
                <div className="mx-5 mt-2 animate-pulse">
                    <div className="py-1">
                        <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10 dark:bg-slate-700"></div>
                    </div>
                    <div className="py-1">
                        <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10 dark:bg-slate-700"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const TrainButtonSkeleton = () => {
    return (
        <button className="bg-slate-300 p-2 m-1 h-10 rounded-md animate-pulse dark:bg-slate-600"></button>
    );
}

export function ModelPageSkeleton() {
    return (
        <div className="basis-11/12 flex flex-row gap-2 justify-stretch grow">
            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                <div className="basis-1/6">
                    <DatasetSkeleton />
                </div>
                <div className="basis-2/3">
                    <ParametersSkeleton />
                </div>
                <div className="basis-1/6">
                    <ModelsSkeleton />
                </div>
            </div>
            <div className="basis-2/3 grow">
                <PlaygroundSkeleton />
            </div>
            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                <div className="basis-1/2">
                    <InfoMenuSkeleton />
                </div>
                <div className="basis-5/12 grow">
                    <LayersSkeleton />
                </div>
                <TrainButtonSkeleton />
            </div>
        </div>
    );
}