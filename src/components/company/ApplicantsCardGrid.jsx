import React from "react";
import ApplicantsCard from "./ApplicantsCard";
import { applicationStatusUpdateMutationOption } from "../../services/mutationOptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../utils/constants";

export default function ApplicantsCardGrid({
    companyApplicants,
    isPlaceholderData,
}) {
    const { isPending: isUpdating, mutateAsync: mutateApplicantStatusAsync } =
        useMutation(applicationStatusUpdateMutationOption());

    const queryClient = useQueryClient();
    const pages = companyApplicants?.pages ?? [];

    async function handleApplicantStatusUpdate(applicationId, type) {
        try {
            const responseData = await mutateApplicantStatusAsync({
                applicationId,
                payload: {
                    status: type,
                },
            });
            toast.success(
                `Status updated to ${responseData?.data.status || "new status"}!`,
            );
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.companyApplicants],
            });
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    error.message ||
                    "Failed to update",
            );
        }
    }

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
                            onApplicantStatusUpdate={
                                handleApplicantStatusUpdate
                            }
                            isUpdating={isUpdating}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
