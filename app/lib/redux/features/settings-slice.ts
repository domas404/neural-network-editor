"use client";

import { createSlice } from "@reduxjs/toolkit";

interface settingsProps {
    isDarkMode: boolean
}

const initialState: settingsProps = {
    isDarkMode: false,
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
        }
    }
});

export const { toogleDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;