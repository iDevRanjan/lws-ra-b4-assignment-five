import { useQuery } from "@tanstack/react-query";
import { ProfileContext } from "../context";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useEffectEvent } from "react";
import { getClientProfileQueryOption } from "../services/queryOptions";

export default function ProfileProvider({ children }) {
    const { authData, logout } = useAuth();
    const {
        isPending,
        data: clientProfileData,
        isError,
        error,
    } = useQuery(getClientProfileQueryOption(authData));

    function handleLogout() {
        if (
            isError &&
            (error?.response.status === 401 || error?.response.status === 403)
        ) {
            logout();
        }
    }
    const onLogout = useEffectEvent(handleLogout);

    useEffect(() => {
        onLogout();
    }, [isError]);

    return (
        <ProfileContext value={{ isPending, clientProfileData }}>
            {children}
        </ProfileContext>
    );
}
