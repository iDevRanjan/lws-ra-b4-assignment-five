import { useApplications } from "../../hooks/useApplications";
import ApplicationJobCardSkeleton from "../skeletons/ApplicationJobCardSkeleton";
import ApplicationJobCard from "./ApplicationJobCard";

export default function RecentApplicationsContainer() {
    const {
        isPending,
        isError,
        error,
        data: jobSeekerApplicationData,
    } = useApplications();

    if (isPending) {
        return <ApplicationJobCardSkeleton />;
    }

    if (isError) {
        return <p className="text-center text-red-600">{error.message}</p>;
    }

    const isApplicationAvailable =
        jobSeekerApplicationData?.success &&
        jobSeekerApplicationData?.data.length > 0;

    if (!isApplicationAvailable) {
        return <p className="text-center">No applications found</p>;
    }

    return (
        <div className="space-y-4">
            {jobSeekerApplicationData?.data.map((applicationData) => (
                <ApplicationJobCard
                    key={applicationData.id}
                    applicationData={applicationData}
                />
            ))}
        </div>
    );
}
