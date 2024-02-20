import "@/app/globalicons.css";
import Script from "next/script";
import Layer from "@/app/ui/model/layer";

export default function Playground() {
    return (
        <>
            <div className="flex shadow-lg h-full">
                <div className="py-4 px-5 w-full">
                    <div className="flex flex-col h-full w-full">
                        <div className="bg-white text-lg font-bold uppercase">
                            My model
                        </div>
                        <div className="flex flex-row h-full w-full justify-center items-center text-sm leading-5 mt-4">
                            <Layer layerId={1} neuronCount={2} />
                            <Layer layerId={1} neuronCount={4} />
                            <Layer layerId={1} neuronCount={3} />
                            <Layer layerId={1} neuronCount={1} />
                        </div>
                    </div>
                </div>
            </div>
            <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js" />
        </>
    );
}
