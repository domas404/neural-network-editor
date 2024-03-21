

export function DatasetPanelSkeleton() {
    return (
        <>
            <div className="flex-none list-none my-2">
                <div className="flex items-center justify-between rounded-full cursor-pointer h-8 px-4 border bg-slate-50">
                    <div className="flex justify-center items-center h-full font-semibold text-sm w-16"></div>
                </div>
            </div>
            <div className="flex-none list-none my-2">
                <div className="flex items-center justify-between rounded-full cursor-pointer h-8 px-4 border bg-slate-50">
                    <div className="flex justify-center items-center h-full font-semibold text-sm w-16"></div>
                </div>
            </div>
        </>
    );
}

export function ModelPageSkeleton() {
    return (
        <div className="w-full h-full bg-white rounded-md flex justify-center items-center">
            <div>Loading...</div>
        </div>
    );
}