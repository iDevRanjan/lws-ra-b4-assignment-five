import { useQuery } from "@tanstack/react-query";
import { ProfileContext } from "../context";
import { useAuth } from "../hooks/useAuth";
import { getClientProfileQueryOption } from "../services/queryOptions";
import useAxios from "../hooks/useAxios";

export default function ProfileProvider({ children }) {
    const { authData } = useAuth();
    const axiosInstance = useAxios();
    const { isPending, data: clientProfileData } = useQuery(
        getClientProfileQueryOption(axiosInstance, authData),
    );

    console.log(isPending);

    return (
        <ProfileContext value={{ isPending, clientProfileData }}>
            {children}
        </ProfileContext>
    );
}
