export default function ActionSelectMenu({
    selectTitle,
    itemsData,
    onValueChange,
    defaultSelect,
    disabled = false,
}) {
    function handleChange(event) {
        onValueChange(event.target.value);
    }

    return (
        <select name={selectTitle} onChange={handleChange} disabled={disabled}>
            <button>
                <selectedcontent></selectedcontent>
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
                {defaultSelect && (
                    <option value="" disabled selected>
                        {defaultSelect}
                    </option>
                )}
                {itemsData?.map((itemData) => (
                    <option key={itemData.id} value={itemData.value}>
                        <div>
                            <span>{itemData.name}</span>
                        </div>
                    </option>
                ))}
            </div>
        </select>
    );
}
