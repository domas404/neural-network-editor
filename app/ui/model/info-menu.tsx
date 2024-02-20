import "@/app/globalicons.css";

interface InfoMenuProps {
    objectName: string;
}

export default function InfoMenu({ objectName }: InfoMenuProps) {
    return (
        <div className="flex shadow-lg h-full">
            <div className="py-4 px-5 w-full">
                <div className="flex flex-col">
                    <div className="bg-white text-lg font-bold uppercase">
                        {objectName}
                    </div>
                    <div className="text-sm leading-5 mt-4">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
