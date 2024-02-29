import Navbar from "@/app/ui/navbar";
import Logo from "@/app/ui/logo";
import Settings from "@/app/ui/settings";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col p-4 bg-neutral-100 gap-4">
            <div className="basis-1/12 flex flex-row items-center justify-between max-h-10">
                <div className="flex basis-1/3">
                    <Link className="justify-self-start" href="/">
                        <Logo iconSize="small" archType="Multilayer perceptron" />
                    </Link>
                </div>
                <Navbar />
                <Settings />
            </div>
            <div className="basis-11/12 flex flex-row gap-3 justify-stretch grow">{children}</div>
        </div>
    );
}