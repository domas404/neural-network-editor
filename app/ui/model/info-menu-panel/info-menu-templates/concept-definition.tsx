import { useAppSelector } from "@/app/lib/redux/store";

export default function ConceptDefinition() {

    const conceptName = useAppSelector((state) => state.infoMenuReducer.itemId);

    return (
        <div>
            <div className="text-base font-bold uppercase dark:text-teal-100">
                {conceptName}
            </div>
            <p className="mt-2 hyphens-auto dark:text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
    );
}


