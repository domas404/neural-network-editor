"use client";

import "@/app/globalicons.css";
import React, { useState, useEffect } from "react";
import { ExecuteTraining } from "@/app/lib/train-model/build-model";

import { useAppSelector, AppDispatch } from '@/app/lib/redux/store';
import { useDispatch } from "react-redux";
import { updateTrainHistory } from "@/app/lib/redux/features/train-slice";
import { TrainHistory } from "@/app/lib/data-types";
import Link from "next/link";

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
            const results: TrainHistory = await ExecuteTraining(dataset[network.dataset], model, hyperparams, network);
            dispatch(updateTrainHistory({ epoch: results.epoch, history: results.history, confusionMatrix: results.confusionMatrix}));
            console.log("Training ended");
            const endTime = performance.now();
            console.log(`Training elapsed ${(endTime - startTime)/1000} seconds`);
            setAnimationState(false);
            setResultsReady(true);
        }
        executeTraining();
    };

    const [animationState, setAnimationState] = useState(false);
    const [resultsReady, setResultsReady] = useState(false);

    useEffect(() => {
        if (resultsReady) {
            setResultsReady(!resultsReady);
        }
    }, [model, hyperparams, network])
    
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
    }

    return (
        <>
            <div className="w-full flex flex-col gap-2">
                <button
                    onClick={() => setAnimationState(true)}
                    className={`bg-lightblue-600 text-teal-100 p-2 rounded-md uppercase font-semibold ${ animationState ? "w-full" : "basis-2/3"}
                        hover:bg-lightblue-700 active:bg-lightblue-800 ${animationState && "pointer-events-none"}
                        transition-all ease-in-out duration-200`}
                    type="submit"
                >
                    {
                        animationState ?
                        <>
                            <div className="inline-block h-4 w-4 border-slate-300 animate-spin rounded-full border-4 border-solid border-current
                                border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_2.5s_linear_infinite]"
                            role="status"
                            ></div>
                            <span className="ml-2">Training...</span>
                        </>
                        :
                            "Train"
                    }
                </button>
                {
                    resultsReady &&
                    <Link href="/model/train" className="bg-slate-600 text-teal-100 p-2 rounded-md uppercase font-semibold basis-1/3
                        hover:bg-lightblue-700 active:bg-lightblue-800 text-center transition-all ease-in-out duration-200">
                            Results
                    </Link>
                }
            </div>
        </>
    );
}
