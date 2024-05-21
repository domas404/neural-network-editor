import { ModelSet } from "@/app/lib/data-types";
import { v4 } from "uuid";

export const defaultModel: ModelSet = {
    'default': {
        name: 'Default',
        type: "mlp",
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
                itemCount: 4
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
                itemCount: 3
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
                itemCount: 3
            },
        ]
    }
};

const myModel: ModelSet = {
    'mymodel': {
        name: 'My Model',
        type: "mlp",
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
                itemCount: 4
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
                itemCount: 5
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
                itemCount: 4
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
                itemCount: 3
            },
        ]
    }
};

export const InitialModels = { ...defaultModel, ...myModel };