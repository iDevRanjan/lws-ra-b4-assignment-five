export function sanitizedStringToArray(string) {
    if (!string) return;

    return string.split("\\n").map((t) => t.replace(/^-\s*/, ""));
}
