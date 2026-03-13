import axios from "axios";
import { store } from "../store";
import { authActions } from "../store/actions/authActions";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:9000",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authData = store.getState().authData;

        if (authData?.token) {
            config.headers.Authorization = `Bearer ${authData.token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            (error?.response.status === 401 || error?.response.status === 403)
        ) {
            authActions.logout();
        }

        return Promise.reject(error);
    },
);
