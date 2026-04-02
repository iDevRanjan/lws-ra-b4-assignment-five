import React from "react";
import ApplicantsCard from "./ApplicantsCard";

export default function ApplicantsCardGrid({
    companyApplicants,
    isPlaceholderData,
}) {
    const pages = companyApplicants?.pages ?? [];

    return (
        <div
            className="mb-4 grid gap-4 md:mb-6 md:gap-6"
            style={{
                opacity: isPlaceholderData ? 0.5 : 1,
            }}
        >
            {pages.map((group) => (
                <React.Fragment key={group.currentPage}>
                    {group.data.map((applicant) => (
                        <ApplicantsCard
                            key={applicant.id}
                            companyApplicantData={applicant}
                            isCard={true}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
