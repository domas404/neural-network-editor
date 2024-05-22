"use client";

import { createSlice } from "@reduxjs/toolkit";

interface settingsProps {
    isDarkMode: boolean,
    language: "lt" | "en",
    isLayerBeingDragged: boolean,
}

const initialState: settingsProps = {
    isDarkMode: false,
    language: "en",
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
        },
        changeLanguage: (state) => {
            if (state.language === "en") {
                state.language = "lt";
            } else {
                state.language = "en";
            }
        }
    }
});

export const { toogleDarkMode, setLayerBeingDragged, setLayerNotBeingDragged, changeLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;