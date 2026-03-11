import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useAxios from "./useAxios";
import { getClientProfileQueryOption } from "../services/queryOptions";

export default function useClientProfile() {
    const { authData } = useAuth();
    const axiosInstance = useAxios();

    return useQuery(getClientProfileQueryOption(axiosInstance, authData));
}
