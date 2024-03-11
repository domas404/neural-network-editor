

export default function Metrics() {
    return (
        <div className="flex rounded-xl shadow-sm h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="bg-white text-base font-bold uppercase">
                        Metrics
                    </div>
                </div>
                <div className="my-2 text-md">
                    <div className="flex flex-col gap-px bg-gray-200">
                        <div className="flex justify-between bg-white py-2">
                            <div>Accuracy</div>
                            <div>80%</div>
                        </div>
                        <div className="flex justify-between bg-white py-2">
                            <div>Precision</div>
                            <div>75%</div>
                        </div>
                        <div className="flex justify-between bg-white py-2">
                            <div>Recall</div>
                            <div>75%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}