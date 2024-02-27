'use client';

import "@/app/globalicons.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
    highlight: string;
}

const links = [
    { name: 'Data', href: '/model/data' },
    { name: 'Model', href: '/model' },
    { name: 'Train', href: '/model/train' },
  ];

export default function Navbar({ highlight }: NavbarProps) {
    const pathname = usePathname();
    return (
        <nav className="basis-1/3 flex justify-center">
            <div className="flex items-center bg-white  shadow-lg h-12 rounded-lg select-none px-1">
                <div className="flex flex-row justify-between h-8 gap-px bg-gray-200">
                    {
                        links.map((link) => {
                            return (
                                <Link
                                    href={link.href}
                                    className="flex items-center justify-center bg-white w-20 font-bold text-sm uppercase"
                                    key={link.href}
                                >
                                    <span className={`${pathname === link.href ? "text-sky-600 font-black text-base" : "text-black"}`}>
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
