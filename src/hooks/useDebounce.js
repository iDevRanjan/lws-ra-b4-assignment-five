import { useRef } from "react";

export function useDebounce(func, delay = 300) {
    const timeoutId = useRef(null);

    return function (...args) {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
            func.apply(this, args);
            timeoutId.current = null;
        }, delay);
    };
}
