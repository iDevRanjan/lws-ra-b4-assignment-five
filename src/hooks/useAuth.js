import { useCallback, useSyncExternalStore } from "react";
import { authActions } from "../store/actions/authActions";
import { store } from "../store";

export function useAuth() {
    const getAuthData = useCallback(() => store.getState().authData, []);
    const authData = useSyncExternalStore(store.subscribe, getAuthData);

    return { authData, ...authActions };
}
