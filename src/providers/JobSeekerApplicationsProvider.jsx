import { JobSeekerApplicationsContext } from "../context";

export default function JobSeekerApplicationsProvider({ children }) {
    return (
        <JobSeekerApplicationsContext value={"Ranjan"}>
            {children}
        </JobSeekerApplicationsContext>
    );
}
