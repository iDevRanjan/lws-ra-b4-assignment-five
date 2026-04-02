export function getQueryParams(object, excludeValues = ["all", "All"]) {
    if (!object) return;

    const params = new URLSearchParams();

    Object.entries(object).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            const hasExcluded = value.some((v) => excludeValues.includes(v));

            if (value.length > 0 && !hasExcluded)
                params.append(key, value.join(","));
        } else if (value !== "" && value != null) {
            params.append(key, value);
        }
    });

    return params.toString();
}
