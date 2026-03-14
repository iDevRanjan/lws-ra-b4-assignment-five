import React from "react";
import JobCard from "./JobCard";

export default function JobCardsGrid({
    allJobsData,
    isPlaceholderData,
    role,
    jobSeekerApplicationData,
}) {
    const pages = allJobsData?.pages ?? [];

    return (
        <div
            className="mb-4 grid gap-4 md:mb-6 md:gap-6"
            style={{
                opacity: isPlaceholderData ? 0.5 : 1,
            }}
        >
            {pages.map((group) => (
                <React.Fragment key={group.currentPage}>
                    {group.data.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            role={role}
                            jobSeekerApplicationData={jobSeekerApplicationData}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
