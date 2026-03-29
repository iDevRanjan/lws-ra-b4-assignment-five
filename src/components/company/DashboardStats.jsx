import { useSuspenseQuery } from "@tanstack/react-query";
import { getCompanyDashboardStatsQueryOption } from "../../services/queryOptions";
import { Briefcase, Clock, Star, Users } from "lucide-react";

export default function DashboardStats() {
    const { data: dashboardStats } = useSuspenseQuery(
        getCompanyDashboardStatsQueryOption(),
    );

    const dashboardStatsData = dashboardStats.data;

    return (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="card p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                </div>
                <h3 className="mb-1 text-2xl font-bold">
                    {dashboardStatsData.activeJobs}
                </h3>
                <p className="text-muted-foreground text-sm">Active Jobs</p>
            </div>
            <div className="card p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                        <Users className="h-6 w-6 text-green-600" />
                    </div>
                </div>
                <h3 className="mb-1 text-2xl font-bold">
                    {dashboardStatsData.totalApplications}
                </h3>
                <p className="text-muted-foreground text-sm">
                    Total Applicants
                </p>
            </div>
            <div className="card p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                        <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                </div>
                <h3 className="mb-1 text-2xl font-bold">
                    {dashboardStatsData.pendingReviews}
                </h3>
                <p className="text-muted-foreground text-sm">Pending Reviews</p>
            </div>
            <div className="card p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                        <Star className="h-6 w-6 text-purple-600" />
                    </div>
                </div>
                <h3 className="mb-1 text-2xl font-bold">
                    {dashboardStatsData.shortLists}
                </h3>
                <p className="text-muted-foreground text-sm">Shortlisted</p>
            </div>
        </div>
    );
}
