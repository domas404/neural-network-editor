import "@/app/globalicons.css";
import InfoMenu from "@/app/ui/model/info-menu";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Data | Multilayer Perceptron',
}

export default function Home() {
    return (
        <main className="h-full flex w-full">
            <div className="basis-11/12 flex flex-row gap-3 justify-stretch grow">
                <div className="flex flex-col gap-3 max-w-56 min-w-48 h-full">
                    <div className="bg-white rounded-xl shadow-md h-full">
                        
                    </div>
                </div>

                <div className="basis-2/3 bg-white rounded-xl shadow-md grow">

                </div>

                <div className="basis-1/6 flex flex-col gap-3 max-w-56 min-w-48">
                    <div className="basis-5/12 bg-white rounded-xl shadow-md">
                        {/* <InfoMenu objectName="Dataset" /> */}
                    </div>
                    <div className="basis-1/4 bg-white rounded-xl shadow-md">
                        {/* <InfoMenu objectName="Features" /> */}
                    </div>
                    <div className="basis-1/4 bg-white rounded-xl shadow-md">
                        {/* <InfoMenu objectName="Targets" /> */}
                    </div>
                    {/* <button className="bg-black text-white p-2 rounded-lg uppercase font-semibold">
                        Train
                    </button> */}
                </div>
            </div>
        </main>
    );
}
