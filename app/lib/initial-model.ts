import { ModelSet } from "@/app/lib/data-types";
import { v4 } from "uuid";

const defaultModel: ModelSet = {
    'default': {
        name: 'Default',
        layers: [
            {
                id: v4(),
                type: "input",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }, { id: v4() }]
            },
            {
                id: v4(),
                type: "hidden",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }]
            },
            {
                id: v4(),
                type: "output",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }]
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
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }, { id: v4() }]
            },
            {
                id: v4(),
                type: "hidden",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }, { id: v4() }, { id: v4() }]
            },
            {
                id: v4(),
                type: "hidden",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }, { id: v4() }]
            },
            {
                id: v4(),
                type: "output",
                neurons: [{ id: v4() }, { id: v4() }, { id: v4() }]
            },
        ]
    }
};

export const InitialModels = { ...defaultModel, ...myModel };