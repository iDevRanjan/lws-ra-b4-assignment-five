import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getClientProfileQueryOption } from "../services/queryOptions";

export function useProfile() {
    const { authData } = useAuth();

    return useQuery(getClientProfileQueryOption(authData));
}
