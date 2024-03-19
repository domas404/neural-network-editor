// import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/lib/redux/store";

export default function Metrics() {

    const accuracy = useAppSelector((state) => state.trainReducer.history.val_acc);
    const finalAccuracy = accuracy[accuracy.length-1];

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
                            <div>{Math.round(finalAccuracy*1000)/10}%</div>
                        </div>
                        <div className="flex justify-between bg-white py-2">
                            <div>Precision</div>
                            <div>-- %</div>
                        </div>
                        <div className="flex justify-between bg-white py-2">
                            <div>Recall</div>
                            <div>-- %</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}