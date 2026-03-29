import { Link } from "react-router";
import RecentApplicantsCard from "./RecentApplicantsCard";
import { useQuery } from "@tanstack/react-query";
import { getCompanyApplicantsQueryOption } from "../../services/queryOptions";
import RecentApplicantsCardSkeleton from "../skeletons/RecentApplicantsCardSkeleton";

export default function RecentApplicantsContainer() {
    const {
        isPending,
        isError,
        error,
        data: companyApplicants,
    } = useQuery(getCompanyApplicantsQueryOption("limit=5"));

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
                {isPending && <RecentApplicantsCardSkeleton />}
                {isError && (
                    <p className="py-4 text-center text-red-600">
                        {error.message}
                    </p>
                )}
                {companyApplicants?.success &&
                    (companyApplicants.data.length > 0 ? (
                        companyApplicants.data.map((companyApplicant) => (
                            <RecentApplicantsCard
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
