export function getDateDifferenceFromNow(dateInput) {
    if (!dateInput) return;

    const now = new Date();
    const targetDate = new Date(dateInput);
    const diffMs = targetDate - now;

    const isFuture = diffMs > 0;
    const diffAbs = Math.abs(diffMs);

    const seconds = Math.floor(diffAbs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    let value;
    let unit;

    if (seconds < 60) {
        return "just now";
    } else if (minutes < 60) {
        value = minutes;
        unit = "minute";
    } else if (hours < 24) {
        value = hours;
        unit = "hour";
    } else if (days < 30) {
        value = days;
        unit = "day";
    } else if (days < 365) {
        value = months;
        unit = "month";
    } else {
        value = years;
        unit = "year";
    }

    const plural = value > 1 ? "s" : "";

    return isFuture
        ? `in ${value} ${unit}${plural}`
        : `${value} ${unit}${plural} ago`;
}
