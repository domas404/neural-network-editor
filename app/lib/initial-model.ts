import { ModelSet } from "@/app/lib/data-types";
import { v4 } from "uuid";

const defaultModel: ModelSet = {
    'default': {
        name: 'Default',
        layers: [
            {
                id: v4(),
                type: "input",
                order: 0,
                neurons: [
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() }
                ],
                activation: "",
            },
            {
                id: v4(),
                type: "hidden",
                order: 1,
                neurons: [
                    { id: v4() },
                    { id: v4() },
                    { id: v4() }
                ],
                activation: "relu",
            },
            {
                id: v4(),
                type: "output",
                order: 2,
                neurons: [
                    { id: v4() },
                    { id: v4() },
                    { id: v4() }
                ],
                activation: "softmax",
            },
        ]
    }
};

const myModel: ModelSet = {
    'mymodel': {
        name: 'My Model',
        layers: [
            {
                id: v4(),
                type: "input",
                order: 0,
                neurons: [
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() }
                ],
                activation: "",
            },
            {
                id: v4(),
                type: "hidden",
                order: 1,
                neurons: [
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() }
                ],
                activation: "relu",
            },
            {
                id: v4(),
                type: "hidden",
                order: 2,
                neurons: [
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() }
                ],
                activation: "relu",
            },
            {
                id: v4(),
                type: "output",
                order: 3,
                neurons: [
                    { id: v4() },
                    { id: v4() },
                    { id: v4() }
                ],
                activation: "softmax",
            },
        ]
    }
};

export const InitialModels = { ...defaultModel, ...myModel };