import { useAppSelector } from "@/app/lib/redux/store";

export default function ConceptDefinition() {

    const conceptName = useAppSelector((state) => state.infoMenuReducer.itemId);

    return (
        <div>
            <div className="bg-white text-base font-bold uppercase">
                {conceptName}
            </div>
            <p className="mt-2 hyphens-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
    );
}


