import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HyperparameterSet } from "@/app/lib/data-types";

const initialState: HyperparameterSet = {
    epochs: 1,
    learningRate: 0.1,
    batchSize: 1,
    optimizer: "SGD",
}

export const param = createSlice({
    name: "param",
    initialState,
    reducers: {
        changeParameter: (state, action: PayloadAction<{ parameter: string, value: any }>) => {
            const { parameter, value } = action.payload;
            return ({
                ...state,
                [parameter]: value
            });
        }
    }
});

export const {changeParameter} = param.actions;
export default param.reducer;