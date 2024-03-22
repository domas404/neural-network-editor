interface RadioOptionProps {
    id: string,
    handleChange: any,
    isChecked: boolean,
    name: string,
    groupName: string
}

export function RadioOption({ id, handleChange, isChecked, name, groupName }: RadioOptionProps) {

    const scrollIntoPlace = (event: React.MouseEvent<HTMLElement>) => {
        event.currentTarget.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div key={id} className="flex-none list-none my-2">
            <input
                onChange={handleChange}
                type="radio"
                id={id}
                name={groupName}
                value={id}
                className="opacity-0 hidden peer"
                required
                checked={isChecked}
            />
            <label
                htmlFor={id}
                onClick={scrollIntoPlace}
                className="flex items-center justify-between rounded-full cursor-pointer h-8 px-4 border
                text-black bg-slate-50 hover:bg-lightblue-50 hover:border-lightblue-100
                peer-checked:text-lightblue-800 peer-checked:bg-blue-100 peer-checked:border-lightblue-100">
                <div className="flex justify-center items-center h-full font-semibold text-sm">
                    {name}
                </div>
            </label>
        </div>
    );
}