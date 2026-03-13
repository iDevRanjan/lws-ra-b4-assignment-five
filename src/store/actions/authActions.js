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
        const resetData = { isLoggedin: false };
        setLocalStorageItem(LOCALSTORAGE_KEYS.authData, resetData);
        store.setState((keys) => keys.authData, initialAuthState);
    },
};
