import { useAppSelector } from "@/app/lib/redux/store";
import { Chart } from "react-google-charts";
import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import ConfusionMatrix from "./confusion-matrix";

export default function PlotMain() {

    const epochs = useAppSelector((state) => state.trainReducer.epoch);
    const currentPlot = useAppSelector((state) => state.infoMenuReducer.itemId);
    const { acc, val_acc, loss, val_loss } = useAppSelector((state) => state.trainReducer.history);
    const confusionMatrix = useAppSelector((state) => state.trainReducer.confusionMatrix);
    const dataset = useAppSelector((state) => state.datasetReducer);
    const datasetId = useAppSelector((state) => state.networkReducer.dataset);
    const [selectedDataset, setSelectedDataset] = useState(dataset[datasetId]);
    const isDarkMode = useAppSelector((state) => state.settingsReducer.isDarkMode);

    useEffect(() => {
        setSelectedDataset(dataset[datasetId]);
    }, [dataset, datasetId]);

    const [plotToShow, setPlotToShow] = useState<React.JSX.Element>();

    const setUpDataArray = (trainData: number[], validationData: number[]) => {
        const pairedArray = _.zip(epochs, trainData, validationData);
        const plotData: number[][] = pairedArray.map(pair => pair as number[]);
        return plotData;
    }
    const options = {
        curveType: "function",
        legend: { position: "bottom" },
        animation: {
            startup: true,
            easing: "linear",
            duration: 200,
        },
        colors: ["#0ea5e9", "#d97706"],
        hAxis: {
            title: "epochs",
        },
        vAxis: {
            title: ""
        }
    }

    const darkModeOptions = {
        curveType: "function",
        legend: { position: "bottom", textStyle: { color: "white" } },
        animation: {
            startup: true,
            easing: "linear",
            duration: 200,
        },
        colors: ["#0ea5e9", "#d97706"],
        backgroundColor:"#1e293b",
        hAxis: {
            title: "epochs",
            gridlines: { color: "#475569" },
            textStyle: { color: "white" },
            baselineColor: "white",
            titleTextStyle: { color: "fff" }
        },
        vAxis: {
            title: "",
            gridlines: { color: "#475569" },
            textStyle: { color: "white" },
            baselineColor: "white",
            titleTextStyle: { color: "fff" }
        },
        textStyle: { color: "white" },
    }

    interface PlotProps {
        plotType: string,
        plotData: number[][]
    }

    const AccuracyPlot = useMemo(() => function setUpAccuracyPlot({ plotType, plotData }: PlotProps) {
        options.vAxis.title = plotType;
        darkModeOptions.vAxis.title = plotType;
        return (
            <Chart
                chartType="LineChart"
                data={[["Epochs", `train ${plotType}`, `validation ${plotType}`], ...plotData]}
                width="100%"
                height="600px"
                options={isDarkMode ? darkModeOptions : options}
            />
        );
    }, [isDarkMode]);

    const LossPlot = useMemo(() => function setUpLossPlot({ plotType, plotData }: PlotProps) {
        options.vAxis.title = plotType;
        darkModeOptions.vAxis.title = plotType;
        return (
            <Chart
                chartType="LineChart"
                data={[["Epochs", `train ${plotType}`, `validation ${plotType}`], ...plotData]}
                width="100%"
                height="600px"
                options={isDarkMode ? darkModeOptions : options}
            />
        );
    }, [isDarkMode]);

    const createPlot = (plotType: string) => {

        let plotData: number[][] = [];
        if (plotType === "confusion matrix") {
            return (
                <ConfusionMatrix confusionMatrix={confusionMatrix} dataset={selectedDataset} />
            );
        } else if (plotType === "accuracy") {
            plotData = setUpDataArray(acc, val_acc);
            return (
                <AccuracyPlot plotType={plotType} plotData={plotData} />
            );
        } else if (plotType === "loss") {
            plotData = setUpDataArray(loss, val_loss);
            return (
                <LossPlot plotType={plotType} plotData={plotData} />
            );
        }
    }

    useEffect(() => {
        setPlotToShow(createPlot(currentPlot));
    }, [currentPlot, isDarkMode]);

    return (
        <div className="w-full h-full">
            {
                epochs.length !== 0 ?
                    <div className="h-full flex justify-center items-center">
                        {plotToShow}
                    </div>
                :
                    <div className="h-full flex justify-center items-center dark:text-white">
                        Train the model to see results.
                    </div>
            }
        </div>
    );
}