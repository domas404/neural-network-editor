"use client";

import "@/app/globalicons.css";

export default function Settings() {

    const toggleDarkMode = () => {
        let root = document.getElementsByTagName("html")[0];
        if (root.classList.contains("dark")) {
            root.classList.remove("dark");
            console.log("switched to light mode")
        } else {
            root.classList.add("dark");
            console.log("switched to dark mode");
        }
    }

    return (
        <div className="basis-1/3 flex justify-end">
            <div className="flex items-center bg-white border shadow-sm h-8 rounded-md select-none px-1
                dark:bg-slate-800 dark:border-slate-700">
                <div className="flex flex-row justify-between gap-px bg-gray-200 dark:bg-slate-700">
                    <div className="bg-white w-8 dark:bg-slate-800 dark:text-slate-200 flex items-center justify-center">
                        <button
                            className="rounded-full flex items-center justify-center h-full
                                hover:text-sky-600 dark:hover:text-teal-200"
                            onClick={toggleDarkMode}
                        >
                            <span className="material-symbols-outlined">
                                light_mode
                            </span>
                        </button>
                    </div>
                    <div className="flex items-center justify-center bg-white w-8 font-bold text-sm
                        dark:bg-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-teal-200">
                        <span>EN</span>
                    </div>
                    <div className="flex items-center justify-center bg-white w-8 font-bold text-sm
                        dark:bg-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-teal-200">
                        <span>?</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
