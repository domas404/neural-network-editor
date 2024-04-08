"use client";

import "@/app/globalicons.css";
import Image from "next/image";
import githubLight from "@/public/github-mark-white.png";
import githubDark from "@/public/github-mark.png";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toogleDarkMode } from "@/app/lib/redux/features/settings-slice";
import { useAppSelector, AppDispatch } from "@/app/lib/redux/store";

export default function Settings() {

    const dispatch = useDispatch<AppDispatch>();
    const isDarkMode = useAppSelector((state) => state.settingsReducer.isDarkMode);

    return (
        <div className="basis-1/3 flex justify-end">
            <div className="flex items-center bg-white border shadow-sm h-8 rounded-md select-none px-1
                dark:bg-slate-800 dark:border-slate-700">
                <div className="flex flex-row justify-between gap-px bg-gray-200 dark:bg-slate-700">
                    <div className="bg-white w-8 dark:bg-slate-800 dark:text-slate-200 flex items-center justify-center">
                        <button
                            className="rounded-full flex items-center justify-center h-full
                                hover:text-sky-600 dark:hover:text-teal-200"
                            onClick={() => dispatch(toogleDarkMode())}
                            title={isDarkMode ? "switch to light mode": "switch to dark mode"}
                        >
                            <span className="material-symbols-outlined md-20">
                                {isDarkMode ? "dark_mode": "light_mode"}
                            </span>
                        </button>
                    </div>
                    <div className="flex items-center justify-center bg-white w-8 font-bold text-sm
                        dark:bg-slate-800 dark:text-slate-200">
                        <Link href="https://github.com/domas404/neural-network-editor" target="blank">
                            <Image
                                src={isDarkMode ? githubLight : githubDark}
                                width={18}
                                alt="github link"
                                className="hover:opacity-70 active:opacity-50 hover:cursor-pointer"
                                title="open github repository"
                            />
                        </Link>
                    </div>
                    {/* <div className="flex items-center justify-center bg-white w-8 font-bold text-sm hover:cursor-pointer
                        dark:bg-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400">
                        <span className="material-symbols-outlined md-20">
                            delete
                        </span>
                    </div> */}
                    {/* <div className="flex items-center justify-center bg-white w-8 font-bold text-sm
                        dark:bg-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-teal-200">
                        <span>EN</span>
                    </div>
                    <div className="flex items-center justify-center bg-white w-8 font-bold text-sm
                        dark:bg-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-teal-200">
                        <span>?</span>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
