"use client";

import { createSlice } from "@reduxjs/toolkit";

interface settingsProps {
    isDarkMode: boolean,
    isLayerBeingDragged: boolean,
}

const initialState: settingsProps = {
    isDarkMode: false,
    isLayerBeingDragged: false,
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        toogleDarkMode: (state) => {
            let root = document.getElementsByTagName("html")[0];
            if (root.classList.contains("dark")) {
                state.isDarkMode = false;
                root.classList.remove("dark");
            } else {
                state.isDarkMode = true;
                root.classList.add("dark");
            }
        },
        setLayerBeingDragged: (state) => {
            state.isLayerBeingDragged = true;
        },
        setLayerNotBeingDragged: (state) => {
            state.isLayerBeingDragged = false;
        }
    }
});

export const { toogleDarkMode, setLayerBeingDragged, setLayerNotBeingDragged } = settingsSlice.actions;
export default settingsSlice.reducer;