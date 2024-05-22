interface ExportElementProps {
    name: string,
    icon: string,
    fileFormat: string
}

const ExportElement = ({name, icon, fileFormat}: ExportElementProps) => {
    return (
        <div className="bg-white dark:bg-slate-800">
            <div className="rounded-lg hover:bg-slate-100 hover:cursor-pointer p-2 dark:hover:bg-slate-700
                active:bg-slate-200 dark:active:bg-slate-600">
                <div className="text-sm dark:text-white">{name}</div>
                <div className="flex flex-row items-center gap-1 text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined md-20">
                        {icon}
                    </span>
                    <div className="font-semibold tracking-wider text-xs">{fileFormat}</div>
                </div>
            </div>
        </div>
    );
}

export default function ExportModel() {
    return (
        <div className="flex rounded-md shadow-sm h-full bg-white border dark:bg-slate-800 dark:border-slate-700">
            <div className="py-5 w-full">
                <div className="flex justify-between px-6">
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        Download
                    </div>
                </div>
                <div className="text-md px-4">
                    <div className="flex flex-col bg-gray-200 mt-2 dark:bg-slate-700">
                        <ExportElement name="Model architecture" icon="code" fileFormat="JSON" />
                        {/* <ExportElement name="Accuracy plot" icon="image" fileFormat="PNG" />
                        <ExportElement name="Loss plot" icon="image" fileFormat="PNG" />
                        <ExportElement name="Neural network graph" icon="image" fileFormat="PNG" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}