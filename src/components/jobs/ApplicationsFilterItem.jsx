export default function ApplicationsFilterItem({
    label,
    type = "checkbox",
    name,
    value,
    handleSetApplicationQueryFilter,
}) {
    function handleChange(event) {
        const { name, value } = event.target;
        handleSetApplicationQueryFilter({ name, value });
    }

    return (
        <label
            htmlFor={label}
            className="flex cursor-pointer items-center gap-2"
        >
            <input
                id={label}
                type={type}
                name={name}
                value={value}
                className="border-input"
                onChange={handleChange}
            />
            <span className="text-sm">{label}</span>
        </label>
    );
}
