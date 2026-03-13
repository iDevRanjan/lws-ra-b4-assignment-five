export function getLocalStorageItem(key) {
    try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : undefined;
    } catch (error) {
        console.error(error);
    }
}
