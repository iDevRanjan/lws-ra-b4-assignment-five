import { useContext } from "react";
import { JobSeekerApplicationsContext } from "../context";

export function useJobSeekerApplications() {
    const context = useContext(JobSeekerApplicationsContext);

    if (!context) {
        throw new Error(
            "useJobSeekerApplications must be used within a JobSeekerApplicationsProvider",
        );
    }

    return context;
}
