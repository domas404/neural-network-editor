import Dataset from '@/app/ui/model/dataset-panel/dataset';
import Parameters from "@/app/ui/model/hyperparameter-panel/parameters";
import Models from "@/app/ui/model/model-panel/models";
import InfoMenu from "@/app/ui/model/info-menu-panel/info-menu";
import Layers from "@/app/ui/model/layers-panel/layers";
import Playground from "@/app/ui/model/playground/playground";
import TrainButton from "@/app/ui/model/train-button";

export default function Home() {

    return (
        <div className="basis-11/12 flex flex-row gap-2 justify-stretch grow">
            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                <div className="basis-1/6">
                    <Dataset />
                </div>
                <div className="basis-2/3">
                    <Parameters />
                </div>
                <div className="basis-1/6">
                    <Models />
                </div>
            </div>
            <div className="basis-2/3 grow">
                <Playground />
            </div>
            <div className="basis-1/6 flex flex-col gap-2 max-w-56 min-w-48">
                <div className="basis-1/2">
                    <InfoMenu />
                </div>
                <div className="basis-5/12 grow">
                    <Layers />
                </div>
                <TrainButton />
            </div>
        </div>
    );
}
