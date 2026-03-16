export function formatDate(isoString) {
    if (!isoString) return;

    const date = new Date(isoString);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }).format(date);
}
