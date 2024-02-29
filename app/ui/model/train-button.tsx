import "@/app/globalicons.css";
import React, { useState } from "react";

export default function TrainButton() {

    const [animationState, setAnimationState] = useState(false);

    const toggleAnimation = () => {
        let neurons = document.querySelectorAll(".neuron-animation-component");
        console.log(neurons);
        if (animationState){
            neurons.forEach(element => {
                element.classList.remove("rotate-animation");
            });
        } else {
            neurons.forEach(element => {
                element.classList.add("rotate-animation");
            });
        }
        setAnimationState(!animationState);
    }
    return (
        <>
            <button
                onClick={toggleAnimation}
                className="bg-black text-white p-2 rounded-lg uppercase font-semibold
                    hover:bg-gray-900 active:bg-gray-600"
                type="submit"
            >
                { animationState ? "Stop" : "Train"}
            </button>
        </>
    );
}
