export function slugify(string) {
    if (!string) return;

    return string
        .toLowerCase()
        .replace(/[^a-z]/g, " ")
        .trim()
        .replace(/\s+/g, "-");
}
