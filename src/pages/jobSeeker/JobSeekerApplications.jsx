import { useState } from "react";
import ApplicationsContainer from "../../components/jobs/ApplicationsContainer";
import { useApplications } from "../../hooks/useApplications";
import ApplicationsView from "../../components/jobs/ApplicationsView";

export default function JobSeekerApplications() {
    const [params, setParams] = useState("");
    const {
        isPending,
        isError,
        error,
        data: jobSeekerApplicationData,
    } = useApplications(params);

    function handleQueryParams(queryParams) {
        setParams(queryParams);
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold">
                            Applied Jobs
                        </h1>
                        <p className="text-muted-foreground">
                            Track all your job applications in one place
                        </p>
                    </div>
                    <div className="text-muted-foreground text-sm">
                        <span className="text-foreground font-medium">
                            {jobSeekerApplicationData?.count || 0}{" "}
                        </span>
                        applications
                    </div>
                </div>
            </div>
            <ApplicationsContainer
                handleQueryParams={handleQueryParams}
                queryParamsProps={params}
            >
                <ApplicationsView
                    isPending={isPending}
                    isError={isError}
                    error={error}
                    jobSeekerApplicationData={jobSeekerApplicationData}
                />
            </ApplicationsContainer>
        </main>
    );
}
