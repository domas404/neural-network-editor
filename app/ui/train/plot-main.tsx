import { useAppSelector } from "@/app/lib/redux/store";
import { Chart } from "react-google-charts";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import ConfusionMatrix from "./confusion-matrix";
import { DatasetProps } from "@/app/lib/data-types";

export default function PlotMain() {

    const epochs = useAppSelector((state) => state.trainReducer.epoch);
    const currentPlot = useAppSelector((state) => state.infoMenuReducer.itemId);
    const { acc, val_acc, loss, val_loss } = useAppSelector((state) => state.trainReducer.history);
    const confusionMatrix = useAppSelector((state) => state.trainReducer.confusionMatrix);
    const dataset = useAppSelector((state) => state.datasetReducer);
    const datasetId = useAppSelector((state) => state.networkReducer.dataset);
    const [selectedDataset, setSelectedDataset] = useState(dataset[datasetId]);

    useEffect(() => {
        setSelectedDataset(dataset[datasetId]);
    }, [dataset]);

    const [plotToShow, setPlotToShow] = useState<React.JSX.Element>();

    const setUpDataArray = (trainData: number[], validationData: number[]) => {
        const pairedArray = _.zip(epochs, trainData, validationData);
        const plotData: number[][] = pairedArray.map(pair => pair as number[]);
        return plotData;
    }

    const createPlot = (plotType: string) => {
        let plotData: number[][] = [];
        if (plotType === "confusion matrix") {
            return (
                <ConfusionMatrix confusionMatrix={confusionMatrix} dataset={selectedDataset} />
            );
        } else if (plotType === "accuracy") {
            plotData = setUpDataArray(acc, val_acc);
        } else if (plotType === "loss") {
            plotData = setUpDataArray(loss, val_loss);
        }
        return (
            <div className="h-full flex justify-center items-center">
                <Chart
                    chartType="LineChart"
                    data={[["Epochs", `train ${plotType}`, `validation ${plotType}`], ...plotData]}
                    width="100%"
                    height="600px"
                    options={{
                        title: `${plotType} plot`,
                        curveType: "function",
                        legend: { position: "bottom" },
                        animation: {
                            startup: true,
                            easing: "linear",
                            duration: 200,
                        },
                    }}
                />
            </div>
        );
    }

    useEffect(() => {
        setPlotToShow(createPlot(currentPlot)); 
    }, [currentPlot]);

    return (
        <div className="w-full h-full">
            {
                epochs.length !== 0 ?
                    plotToShow
                :
                    <div className="h-full flex justify-center items-center">
                        Train the model to see results.
                    </div>
            }
        </div>
    );
}