import axios from "axios";
import { useEffect, useEffectEvent } from "react";
import { useAuth } from "./useAuth";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9000",
});

export default function useAxios() {
    const { authData, logout } = useAuth();

    const onLogout = useEffectEvent(logout);

    useEffect(() => {
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
                    onLogout();
                }

                return Promise.reject(error);
            },
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestIntercept);
            axiosInstance.interceptors.response.eject(responseIntercept);
        };
    }, [authData?.token]);

    return axiosInstance;
}
