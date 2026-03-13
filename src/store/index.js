import { getLocalStorageItem } from "../utils/getLocalStorageItem";
import { LOCALSTORAGE_KEYS } from "../utils/constants";
import { initialAuthState } from "../data/initialAuthState";

function createStore(initialStoreState) {
    let state = { ...initialStoreState };
    const listeners = new Set();

    const keys = {};
    for (const key in initialStoreState) {
        keys[key] = key;
    }

    return {
        getState: () => state,
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        setState: (selectKeyFn, nextStateOrFn) => {
            if (typeof selectKeyFn !== "function") {
                console.error(
                    `[Store Error]: The first argument must be a selector function. Usage: setState((keys) => keys.username, nextValue)`,
                );
                return;
            }

            const key = selectKeyFn(keys);

            if (!key || !keys[key]) {
                console.error(
                    `[Store Error]: Selected key "${key}" is invalid or does not exist in the initial state.`,
                );
                return;
            }

            const currentState = state[key];
            const nextState =
                typeof nextStateOrFn === "function"
                    ? nextStateOrFn(currentState)
                    : nextStateOrFn;

            if (!Object.is(currentState, nextState)) {
                state = {
                    ...state,
                    [key]: nextState,
                };
                listeners.forEach((listener) => listener());
            }
        },
    };
}

const initialStoreState = {
    authData:
        getLocalStorageItem(LOCALSTORAGE_KEYS.authData) ?? initialAuthState,
};

export const store = createStore(initialStoreState);
