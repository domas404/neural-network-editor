import "@/app/globalicons.css";

interface LogoProps {
    iconSize: "small" | "large",
    archType: string,
}

export default function Logo({ iconSize, archType }: LogoProps) {
    return (
        <div className="flex flex-row items-center justify-start select-none">
            <span className={`material-symbols-outlined ${iconSize == "large" ? "md-48" : "md-36"}`}>
                neurology
            </span>
            <div>
                <div className={`${iconSize == "large" ? "text-lg" : "text-md"} font-bold ml-2 leading-4`}>
                    Neural Network Editor
                </div>
                {
                    archType &&
                        <div className="text-xs font-bold ml-2 uppercase text-center text-lightblue-500">
                            Multilayer Perceptron
                        </div>
                }
            </div>
        </div>
    );
}
