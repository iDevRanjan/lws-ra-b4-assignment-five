import { Link } from "react-router";
import ApplicantsCard from "./ApplicantsCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCompanyApplicantsQueryOption } from "../../services/queryOptions";
import ApplicantsCardSkeleton from "../skeletons/ApplicantsCardSkeleton";

export default function RecentApplicantsContainer() {
    const {
        isPending,
        isError,
        error,
        data: companyApplicants,
    } = useInfiniteQuery(getCompanyApplicantsQueryOption(""));

    const companyApplicantsData = companyApplicants?.pages[0] ?? {};

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
                {isPending && <ApplicantsCardSkeleton />}
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
