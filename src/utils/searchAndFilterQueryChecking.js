export function searchAndFilterQueryChecking(object) {
    if (!object) return;

    const isAllFalsyValue = Object.entries(object).every(([key, value]) => {
        if (key === "sort") return true;
        if (Array.isArray(value)) return value.length === 0;
        return !value;
    });

    return isAllFalsyValue;
}
