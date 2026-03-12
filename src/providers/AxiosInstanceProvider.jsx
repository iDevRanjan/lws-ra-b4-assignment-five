import axios from "axios";
import { AxiosInstanceContext } from "../context";
import { useAuth } from "../hooks/useAuth";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9000",
});

export default function AxiosInstanceProvider({ children }) {
    const { authData, logout } = useAuth();

    const requestIntercept = axiosInstance.interceptors.request.use(
        (config) => {
            if (authData?.token) {
                config.headers.Authorization = `Bearer ${authData.token}`;
            }

            return config;
        },
        (error) => Promise.reject(error),
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (
                error.response &&
                (error?.response.status === 401 ||
                    error?.response.status === 403)
            ) {
                logout();
            }

            return Promise.reject(error);
        },
    );

    for (
        let index = 0;
        index < (requestIntercept + responseIntercept) / 2;
        index++
    ) {
        axiosInstance.interceptors.request.eject(index);
        axiosInstance.interceptors.response.eject(index);
    }

    return (
        <AxiosInstanceContext value={axiosInstance}>
            {children}
        </AxiosInstanceContext>
    );
}
