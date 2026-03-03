export default function FilterMenu({
    selectTitle,
    inputType,
    itemsData,
    name,
    handleSetQueryFilter,
}) {
    function handleChange(event) {
        const { name, value } = event.target;
        handleSetQueryFilter({ name, value });
    }

    return (
        <select name={selectTitle}>
            <button>
                <span>{selectTitle}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="select-arrow"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>
            <div className="option-container">
                {itemsData?.map((itemData) => (
                    <label
                        htmlFor={itemData.name}
                        key={itemData.id}
                        className="option-value-wrap"
                    >
                        <input
                            type={inputType}
                            name={name}
                            value={itemData.value}
                            id={itemData.name}
                            onChange={handleChange}
                        />
                        <span>{itemData.name}</span>
                    </label>
                ))}
            </div>
        </select>
    );
}
