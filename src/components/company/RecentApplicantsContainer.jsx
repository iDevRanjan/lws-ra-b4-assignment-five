import { Link } from "react-router";
import ApplicantsCard from "./ApplicantsCard";
import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { getCompanyApplicantsQueryOption } from "../../services/queryOptions";
import ApplicantsCardSkeleton from "../skeletons/ApplicantsCardSkeleton";
import { applicationStatusUpdateMutationOption } from "../../services/mutationOptions";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../utils/constants";

export default function RecentApplicantsContainer() {
    const {
        isPending,
        isError,
        error,
        data: companyApplicants,
    } = useInfiniteQuery(getCompanyApplicantsQueryOption(""));
    const { isPending: isUpdating, mutateAsync: mutateApplicantStatusAsync } =
        useMutation(applicationStatusUpdateMutationOption());

    const queryClient = useQueryClient();
    const companyApplicantsData = companyApplicants?.pages[0] ?? {};

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
        <div className="card">
            <div className="border-border border-b p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Recent Applicants</h2>
                    <Link
                        to="/applicants"
                        className="text-primary text-sm hover:underline"
                    >
                        View All
                    </Link>
                </div>
            </div>
            <div className="divide-border divide-y">
                {isPending && <ApplicantsCardSkeleton isCard={false} />}
                {isError && (
                    <p className="py-4 text-center text-red-600">
                        {error.message}
                    </p>
                )}
                {companyApplicantsData?.success &&
                    (companyApplicantsData.data.length > 0 ? (
                        companyApplicantsData.data.map((companyApplicant) => (
                            <ApplicantsCard
                                key={companyApplicant.id}
                                companyApplicantData={companyApplicant}
                                isCard={false}
                                onApplicantStatusUpdate={
                                    handleApplicantStatusUpdate
                                }
                                isUpdating={isUpdating}
                            />
                        ))
                    ) : (
                        <p className="text-muted-foreground py-4 text-center">
                            You have no applicant
                        </p>
                    ))}
            </div>
        </div>
    );
}
