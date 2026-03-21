import { store } from "..";
import { initialAuthState } from "../../data/initialAuthState";
import { queryClient } from "../../services/queryClient";
import { LOCALSTORAGE_KEYS, QUERY_KEYS } from "../../utils/constants";
import { setLocalStorageItem } from "../../utils/setLocalStorageItem";

export const authActions = {
    login: (loginResponseData) => {
        queryClient.removeQueries({
            queryKey: [QUERY_KEYS.clientProfile, null],
            exact: true,
        });
        setLocalStorageItem(LOCALSTORAGE_KEYS.authData, loginResponseData);
        store.setState((keys) => keys.authData, loginResponseData);
    },
    logout: () => {
        queryClient.clear();
        setLocalStorageItem(LOCALSTORAGE_KEYS.authData, initialAuthState);
        store.setState((keys) => keys.authData, initialAuthState);
    },
};
