export default function FilterItem({
    label,
    type = "checkbox",
    name,
    value,
    onQueryFilter,
}) {
    function handleChange(event) {
        const { name, value } = event.target;
        onQueryFilter({ name, value });
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
