import { ModelSet } from "@/app/lib/data-types";
import { v4 } from "uuid";

export const defaultModel: ModelSet = {
    'default': {
        name: 'Default',
        type: "mlp",
        parameters: 27,
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
        parameters: 64,
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

export const defaultCNN: ModelSet = {
    'defaultCNN': {
        name: 'Default CNN',
        type: "cnn",
        parameters: 40,
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
                type: "convolution",
                order: 1,
                filters: [
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() }
                ],
                depth: 0,
                kernelSize: 2,
                padding: 0,
                stride: 1,
                activation: "relu",
                itemCount: 6
            },
            {
                id: v4(),
                type: "convolution",
                order: 1,
                filters: [
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() }
                ],
                depth: 0,
                kernelSize: 2,
                padding: 0,
                stride: 1,
                activation: "relu",
                itemCount: 6
            },
            {
                id: v4(),
                type: "pooling",
                order: 2,
                pools: [
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() },
                    { id: v4() }
                ],
                depth: 0,
                poolSize: 2,
                padding: 0,
                stride: 1,
                activation: "relu",
                itemCount: 6,
                poolType: "max"
            },
            {
                id: v4(),
                type: "hidden",
                order: 3,
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
                type: "output",
                order: 4,
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

export const InitialModels = { ...defaultModel, ...myModel, ...defaultCNN };