import { AuthContext } from "../context";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCALSTORAGE_KEYS } from "../utils/constants";

export default function AuthProvider({ children }) {
    const [authData, setAuthData] = useLocalStorage(
        LOCALSTORAGE_KEYS.authData,
        null,
    );

    function login(data) {
        setAuthData(data);
    }

    function logout() {
        setAuthData(null);
    }

    console.log(authData);

    return (
        <AuthContext value={{ authData, login, logout }}>
            {children}
        </AuthContext>
    );
}
