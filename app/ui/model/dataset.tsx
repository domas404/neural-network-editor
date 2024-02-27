import "@/app/globalicons.css";
import Link from "next/link"

interface DatasetProps {
    datasetNames: string[];
    chosenDataset: string;
}

export default function Dataset({ datasetNames, chosenDataset }: DatasetProps) {
    return (
        <div className="flex shadow-lg h-full">
            <div className="py-5 px-6 w-full">
                <div className="flex justify-between">
                    <div className="bg-white text-base font-bold uppercase">
                        Dataset
                    </div>
                    <Link href="/model/data" className="select-none hover:cursor-pointer text-gray-400 hover:text-gray-500 active:text-gray-600">
                        <span className="material-symbols-outlined">
                            arrow_right_alt
                        </span>
                    </Link>
                </div>
                <div className="overflow-x-scroll flex flex-row h-14 items-center gap-2">
                    {
                        datasetNames.map((item) => {
                            return (
                                <li key={item} className="flex-none list-none my-2">
                                    <input type="radio" id={item} name="dataset" value={item} className="opacity-0 hidden peer" required />
                                    <label htmlFor={item} className={`flex items-center justify-between rounded-full cursor-pointer h-8 px-4
                                    text-black bg-gray-100 peer-checked:text-white peer-checked:bg-black`}>
                                        <div className="flex justify-center items-center h-full font-semibold text-sm">
                                            {item}
                                        </div>
                                    </label>
                                </li>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
