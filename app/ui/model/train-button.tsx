"use client";

import "@/app/globalicons.css";
import React, { useState, useEffect } from "react";
import { ExecuteTraining } from "@/app/lib/build-model";

import { useAppSelector, AppDispatch } from '@/app/lib/redux/store';
import { useDispatch } from "react-redux";
import { updateTrainHistory } from "@/app/lib/redux/features/train-slice";
import { TrainHistory } from "@/app/lib/data-types";

export default function TrainButton() {

    const dataset = useAppSelector((state) => state.datasetReducer);
    const model = useAppSelector((state) => state.modelsReducer);
    const hyperparams = useAppSelector((state) => state.paramReducer);
    const network = useAppSelector((state) => state.networkReducer);

    const dispatch = useDispatch<AppDispatch>();

    const handleTrain = () => {
        async function executeTraining() {
            console.log(model["default"].layers);
            console.log("Training started");
            const startTime = performance.now();
            const results: TrainHistory = await ExecuteTraining(dataset, model, hyperparams, network);
            // console.log(results);
            dispatch(updateTrainHistory({ epoch: results.epoch, history: results.history}));
            console.log("Training ended");
            const endTime = performance.now();
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
                className="bg-lightblue-600 text-teal-100 p-2 m-1 rounded-md uppercase font-semibold
                    hover:bg-lightblue-700 active:bg-lightblue-800"
                type="submit"
            >
                { animationState ? "Stop" : "Train"}
            </button>
        </>
    );
}
