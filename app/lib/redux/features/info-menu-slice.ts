"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface infoMenu {
    infoType: string,
    itemId: string,
}

const initialState: infoMenu = {
    infoType: "",
    itemId: ""
}

export const infoMenuSlice = createSlice({
    name: "info-menu",
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<{ infoType: string, id: string }>) => {
            state.infoType = action.payload.infoType;
            state.itemId = action.payload.id;
        },
        clearInfo: (state) => {
            state.infoType = "";
            state.itemId = "";
        }
    }
});

export const { setInfo, clearInfo } = infoMenuSlice.actions;
export default infoMenuSlice.reducer;