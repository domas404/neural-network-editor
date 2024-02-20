import "@/app/globalicons.css";
import Script from "next/script";
import Layer from "@/app/ui/model/layer";

export default function Playground() {
    return (
        <>
            <div className="flex shadow-lg h-full">
                <div className="w-full">
                    <div className="flex flex-col h-full w-full relative">
                        <div className="flex flex-row h-full w-full justify-center items-center absolute top-0 text-sm leading-5">
                            <Layer layerId={1} neuronCount={2} />
                            <Layer layerId={1} neuronCount={4} />
                            <Layer layerId={1} neuronCount={3} />
                            <Layer layerId={1} neuronCount={1} />
                        </div>
                        <div className="py-4 px-5 text-lg z-0 font-bold uppercase">
                            My model
                        </div>
                    </div>
                </div>
            </div>
            <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js" />
        </>
    );
}
