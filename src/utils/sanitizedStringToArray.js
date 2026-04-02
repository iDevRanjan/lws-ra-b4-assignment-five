export function sanitizedStringToArray(string) {
    if (!string) return [];

    const result = string
        .split(/\n|\\n/)
        .map((item) => item.replace(/^[-•*–]\s*/, "").trim())
        .filter(Boolean);

    return [...new Set(result)];
}
