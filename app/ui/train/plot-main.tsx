import { useAppSelector } from "@/app/lib/redux/store";
import Script from "next/script";
import { Chart } from "react-google-charts";
import _ from "lodash";
import React, { useEffect, useState } from "react";

export default function PlotMain() {

    const epochs = useAppSelector((state) => state.trainReducer.epoch);
    const accuracy = useAppSelector((state) => state.trainReducer.history.acc);
    const loss = useAppSelector((state) => state.trainReducer.history.loss);
    const currentPlot = useAppSelector((state) => state.infoMenuReducer.itemId);

    const [plotToShow, setPlotToShow] = useState<React.JSX.Element>();

    const setUpDataArray = (arrayToZip: number[]) => {
        const pairedArray = _.zip(epochs, arrayToZip);
        const accuracyPlotData: number[][] = pairedArray.map(pair => pair as number[]);
        return accuracyPlotData;
    }

    const createPlot = (plotType: string) => {
        let accuracyPlotData: number[][] = [];
        if (plotType === "accuracy") {
            accuracyPlotData = setUpDataArray(accuracy);
        } else if (plotType === "loss") {
            accuracyPlotData = setUpDataArray(loss);
        }
        return (
            <Chart
                chartType="LineChart"
                data={[["Epochs", `${plotType}`], ...accuracyPlotData]}
                width="100%"
                height="600px"
                options={{
                    title: `${plotType} plot`,
                    curveType: "function",
                    legend: { position: "bottom" }
                }}
            />
        );
    }

    useEffect(() => {
        setPlotToShow(createPlot(currentPlot)); 
    }, [currentPlot]);

    return (
        <div className="w-full">
            {plotToShow}
        </div>
    );
}