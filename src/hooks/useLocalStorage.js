import { useState, useEffect } from "react";

function setItem(key, value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error);
    }
}

function getItem(key) {
    try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : undefined;
    } catch (error) {
        console.error(error);
    }
}

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getItem(key) || initialValue;
    });

    useEffect(() => {
        setItem(key, value);
    }, [key, value]);

    return [value, setValue];
}
