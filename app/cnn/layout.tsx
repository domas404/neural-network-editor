import Navbar from "@/app/ui/navbar";
import Logo from "@/app/ui/logo";
import Settings from "@/app/ui/settings";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full flex flex-col p-3 bg-slate-50 gap-4 dark:bg-slate-900">
            <div className="basis-1/12 flex flex-row items-center justify-between max-h-10 pt-1">
                <div className="flex basis-1/3">
                    <Link className="justify-self-start" href="/">
                        <Logo iconSize="small" archType="Convolutional NN" />
                    </Link>
                </div>
                <Navbar networkType="cnn" />
                <Settings />
            </div>
            <div className="basis-11/12 flex flex-row gap-3 justify-stretch grow">{children}</div>
        </div>
    );
}