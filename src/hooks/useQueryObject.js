import { useContext } from "react";
import { QueryObjectContext } from "../context";

export function useQueryObject() {
    const context = useContext(QueryObjectContext);

    if (!context) {
        throw new Error(
            "useQueryObject must be used within a QueryObjectProvider",
        );
    }

    return context;
}
