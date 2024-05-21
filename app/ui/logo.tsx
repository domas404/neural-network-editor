import "@/app/globalicons.css";

interface LogoProps {
    iconSize: "small" | "large",
    archType: string,
}

export default function Logo({ iconSize, archType }: LogoProps) {
    return (
        <div className="flex flex-row items-center justify-start select-none">
            <span className={`material-symbols-outlined ${iconSize == "large" ? "md-48" : "md-36"} dark:text-white`}>
                neurology
            </span>
            <div>
                <div className={`${iconSize == "large" ? "text-lg" : "text-md"} font-bold ml-2 leading-4 dark:text-white`}>
                    Neural Network Editor
                </div>
                {
                    archType &&
                        <div className="text-xs font-bold ml-2 uppercase text-center text-lightblue-500">
                            {archType}
                        </div>
                }
            </div>
        </div>
    );
}
