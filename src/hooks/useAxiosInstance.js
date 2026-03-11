import { useContext } from "react";
import { AxiosInstanceContext } from "../context";

export function useAxiosInstance() {
    const context = useContext(AxiosInstanceContext);

    if (!context) {
        throw new Error(
            "useAxiosInstance must be used within a AxiosInstanceProvider",
        );
    }

    return context;
}
