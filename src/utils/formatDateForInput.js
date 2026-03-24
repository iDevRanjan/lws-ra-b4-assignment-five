export function formatDateForInput(isoString) {
    if (!isoString) return;

    return isoString.split("T")[0];
}
