"use client";

import "@/app/globalicons.css";
import React, { useState, useContext, useCallback, useEffect } from "react";
import { BuildModel, PrepareForTraining } from "@/app/lib/build-model";

import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/lib/redux/store';

export default function TrainButton() {

    const dataset = useAppSelector((state) => state.datasetReducer);
    const model = useAppSelector((state) => state.modelsReducer);
    const hyperparams = useAppSelector((state) => state.paramReducer);
    const network = useAppSelector((state) => state.networkReducer);

    const handleTrain = () => {
        async function executeTraining() {
            // const a = toggleAnimation();
            // setAnimationState(!animationState);
            console.log("Training started");
            const startTime = performance.now();
            await PrepareForTraining(dataset, model, hyperparams, network);
            console.log("Training ended");
            const endTime = performance.now();
            // setAnimationState(!animationState);
            console.log(`Training elapsed ${(endTime - startTime)/1000} seconds`);
            setAnimationState(false);
        }
        executeTraining();
    };

    const [animationState, setAnimationState] = useState(false);
    
    useEffect(() => {
        toggleAnimation();
        if (animationState) {
            setTimeout(() => {
                handleTrain();
            }, 50);
        }
    }, [animationState]);

    const toggleAnimation = () => {
        let neurons = document.querySelectorAll(".neuron-animation-component");
        if (!animationState){
            neurons.forEach(element => {
                element.classList.remove("rotate-animation");
            });
        } else {
            neurons.forEach(element => {
                element.classList.add("rotate-animation");
            });
        }
        // setAnimationState(!animationState);
        // return "";
    }

    return (
        <>
            <button
                onClick={() => setAnimationState(true)}
                className="bg-black text-white p-2 rounded-lg uppercase font-semibold
                    hover:bg-gray-900 active:bg-gray-600"
                type="submit"
            >
                { animationState ? "Stop" : "Train"}
            </button>
        </>
    );
}
