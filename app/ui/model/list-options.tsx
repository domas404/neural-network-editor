interface RadioOptionProps {
    id: string,
    handleChange: any,
    isChecked: boolean,
    name: string,
    groupName: string
}

export function RadioOption({ id, handleChange, isChecked, name, groupName }: RadioOptionProps) {
    return (
        <li key={id} className="flex-none list-none my-2">
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
            <label htmlFor={id} className="flex items-center justify-between rounded-full cursor-pointer h-8 px-4
                text-black bg-gray-100 peer-checked:text-white peer-checked:bg-black">
                <div className="flex justify-center items-center h-full font-semibold text-sm">
                    {name}
                </div>
            </label>
        </li>
    );
}