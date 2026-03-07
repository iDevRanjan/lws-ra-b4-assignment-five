import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCALSTORAGE_KEYS, QUERY_KEYS } from "../utils/constants";

export default function AuthProvider({ children }) {
    const [authData, setAuthData] = useLocalStorage(
        LOCALSTORAGE_KEYS.authData,
        {
            isLoggedin: false,
        },
    );
    const queryClient = useQueryClient();

    function login(data) {
        queryClient.removeQueries({
            queryKey: [QUERY_KEYS.clientProfile, null],
            exact: true,
        });
        setAuthData(data);
    }

    function logout() {
        queryClient.clear();
        setAuthData({
            isLoggedin: false,
        });
    }

    return (
        <AuthContext value={{ authData, login, logout }}>
            {children}
        </AuthContext>
    );
}
