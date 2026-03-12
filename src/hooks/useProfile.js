import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getClientProfileQueryOption } from "../services/queryOptions";
import { useAxiosInstance } from "./useAxiosInstance";
// import { useAxios } from "./useAxios";

export function useProfile() {
    const { authData } = useAuth();
    const axiosInstance = useAxiosInstance();

    console.log(axiosInstance.interceptors.request);
    console.log(axiosInstance.interceptors.response);

    return useQuery(getClientProfileQueryOption(axiosInstance, authData));
}
