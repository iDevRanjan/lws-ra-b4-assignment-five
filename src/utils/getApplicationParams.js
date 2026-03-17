export function getApplicationParams(object) {
    if (!object) return;

    const params = new URLSearchParams();

    Object.entries(object).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            if (value.length > 0 && !value.includes("All")) {
                params.append(key, value.join(","));
            }
        } else if (value !== "" && value != null) {
            params.append(key, value);
        }
    });

    return params.toString();
}
