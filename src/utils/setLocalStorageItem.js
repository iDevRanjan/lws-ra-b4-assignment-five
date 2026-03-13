export function setLocalStorageItem(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error);
    }
}
