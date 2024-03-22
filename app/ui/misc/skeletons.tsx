export const DatasetPanelSkeleton = () => {
    return (
        <>
            <div className="my-2">
                <div className="rounded-full h-8 px-4 bg-slate-200">
                    <div className="w-16"></div>
                </div>
            </div>
            <div className="my-2">
                <div className="rounded-full h-8 px-4 bg-slate-200">
                    <div className="w-16"></div>
                </div>
            </div>
        </>
    );
}

export const DatasetSkeleton = () => {
    return (
        <div className="flex shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="text-base font-bold uppercase">
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
        <div className="h-full rounded-xl shadow-sm">
            <div className="flex flex-col py-5 px-1 w-full h-full">
                <div className="mx-5 shrink">
                    <div className="bg-white text-base font-bold uppercase text-ellipsis overflow-hidden" title="Hyperparameters">
                        Hyperparameters
                    </div>
                </div>
                <div className="mx-1 mt-2 overflow-y-auto h-full animate-pulse">
                    <div className="mx-4 scrollable-container">
                        <div className="py-3">
                            <div className="rounded-full w-1/2 h-4 bg-slate-200 mb-2"></div>
                            <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10"></div>
                        </div>
                        <div className="py-4">
                            <div className="rounded-full w-1/2 h-4 bg-slate-200 mb-2"></div>
                            <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10"></div>
                        </div>
                        <div className="py-4">
                            <div className="rounded-full w-1/2 h-4 bg-slate-200 mb-2"></div>
                            <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const ModelsSkeleton = () => {
    return (
        <div className="flex shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="text-base font-bold uppercase">
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
        <div className="w-full h-full flex flex-row gap-2 justify-center items-center">
            <div
                className="inline-block h-6 w-6 border-slate-300 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            >
            </div>
            <div className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Loading...</div>
        </div>
    );
}

export const InfoMenuSkeleton = () => {
    return (
        <div className="h-full rounded-xl shadow-sm">
            <div className="flex flex-col py-5 px-1 w-full h-full">
                <div className="mx-5 shrink">
                    <div className="bg-white text-base font-bold uppercase text-ellipsis overflow-hidden" title="Hyperparameters">
                        Network
                    </div>
                </div>
                <div className="mx-1 mt-2 overflow-y-auto h-full animate-pulse">
                    <div className="mx-4 scrollable-container">
                        <div className="py-3 bg-white">
                            <div className="rounded-full w-1/2 h-4 bg-slate-200 mb-2"></div>
                            <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export const LayersSkeleton = () => {
    return (
        <div className="h-full rounded-xl shadow-sm">
            <div className="flex flex-col py-5 px-1 w-full h-full">
                <div className="mx-5 shrink">
                    <div className="bg-white text-base font-bold uppercase text-ellipsis overflow-hidden" title="Hyperparameters">
                        Layers
                    </div>
                </div>
                <div className="mx-5 mt-2 animate-pulse">
                    <div className="py-1 bg-white">
                        <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10"></div>
                    </div>
                    <div className="py-1 bg-white">
                        <div className="bg-slate-100 py-2.5 px-4 rounded-lg w-full h-10"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const TrainButtonSkeleton = () => {
    return (
        <button className="bg-slate-300 p-2 m-1 h-10 rounded-md animate-pulse"></button>
    );
}

export function ModelPageSkeleton() {
    return (
        <div className="basis-11/12 flex flex-row gap-2 justify-stretch grow">
            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                <div className="basis-1/6 bg-white rounded-lg shadow-xs border">
                    <DatasetSkeleton />
                </div>
                <div className="basis-2/3 bg-white rounded-lg shadow-xs border">
                    <ParametersSkeleton />
                </div>
                <div className="basis-1/6 bg-white rounded-lg shadow-xs border">
                    <ModelsSkeleton />
                </div>
            </div>
            <div className="basis-2/3 bg-white rounded-lg shadow-xs grow border">
                <PlaygroundSkeleton />
            </div>
            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                <div className="basis-1/2 bg-white rounded-lg shadow-xs border">
                    <InfoMenuSkeleton />
                </div>
                <div className="basis-5/12 bg-white rounded-lg shadow-xs grow border">
                    <LayersSkeleton />
                </div>
                <TrainButtonSkeleton />
            </div>
        </div>
    );
}