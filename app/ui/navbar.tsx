'use client';

import "@/app/globalicons.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface navbarProps {
    networkType: string
}

const links = [
    { name: 'Data', href: '/data' },
    { name: 'Model', href: '' },
    { name: 'Train', href: '/train' },
];

export default function Navbar({ networkType }: navbarProps) {
    const pathname = usePathname();
    return (
        <nav className="basis-1/3 flex justify-center">
            <div className="flex items-center bg-white shadow-sm border h-12 rounded-md select-none px-1
                dark:bg-slate-800 dark:border-slate-700">
                <div className="flex flex-row justify-between h-8 gap-px bg-gray-200 dark:bg-slate-700">
                    {
                        links.map((link) => {
                            return (
                                <Link
                                    href={`/${networkType}${link.href}`}
                                    className="flex items-center justify-center bg-white w-20 font-bold text-sm uppercase group
                                        dark:bg-slate-800"
                                    key={`/${networkType}${link.href}`}
                                >
                                    <span className={`${pathname === `/${networkType}${link.href}` ? "text-lightblue-600 font-black text-base dark:text-teal-200" : "text-black dark:text-white"}
                                        bg-none group-hover:underline decoration-4 decoration-lightblue-300`}
                                    >
                                        {link.name}
                                    </span>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </nav>
    );
}
