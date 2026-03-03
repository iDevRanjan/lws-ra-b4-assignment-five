export function searchAndFilterQueryChecking(object) {
    if (!object) return;

    const isAllFalsyValue = Object.values(object).every((value) => {
        if (Array.isArray(value)) return value.length === 0;
        return !value;
    });

    return isAllFalsyValue;
}
