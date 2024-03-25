// import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/lib/redux/store";

export default function Metrics() {

    const accuracy = useAppSelector((state) => state.trainReducer.history.val_acc);
    const precision = useAppSelector((state) => state.trainReducer.history.precision);
    const recall = useAppSelector((state) => state.trainReducer.history.recall);
    const finalAccuracy = accuracy[accuracy.length-1];

    return (
        <div className="flex shadow-sm h-full bg-white border dark:bg-slate-800 dark:border-slate-700 rounded-md">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="text-base font-bold uppercase dark:text-teal-100">
                        Metrics
                    </div>
                </div>
                <div className="my-2 text-md">
                    <div className="flex flex-col gap-px bg-gray-200 dark:bg-slate-700">
                        <div className="flex justify-between bg-white py-2 dark:bg-slate-800 dark:text-white">
                            <div>Accuracy</div>
                            <div>{finalAccuracy ? Math.round(finalAccuracy*1000)/10 : "-- "}%</div>
                        </div>
                        <div className="flex justify-between bg-white py-2 dark:bg-slate-800 dark:text-white">
                            <div>Precision</div>
                            <div>{precision !== 0 ? Math.round(precision*1000)/10 : "-- "}%</div>
                        </div>
                        <div className="flex justify-between bg-white py-2 dark:bg-slate-800 dark:text-white">
                            <div>Recall</div>
                            <div>{recall !== 0 ? Math.round(recall*1000)/10 : "-- "}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}