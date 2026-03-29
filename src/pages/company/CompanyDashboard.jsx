import { Lightbulb } from "lucide-react";
import DashboardStats from "../../components/company/DashboardStats";
import RecentApplicantsContainer from "../../components/company/RecentApplicantsContainer";
import RecentJobsContainer from "../../components/company/RecentJobsContainer";
import CompanyQuickActions from "../../components/company/CompanyQuickActions";

export default function CompanyDashboard() {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold">
                    Welcome back, TechCorp! 👋
                </h1>
                <p className="text-muted-foreground">
                    Here's what's happening with your job postings today
                </p>
            </div>
            <DashboardStats />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <RecentJobsContainer />
                    <RecentApplicantsContainer />
                </div>
                <div className="space-y-6 lg:col-span-1">
                    <CompanyQuickActions />
                    <div className="card border-blue-200 bg-blue-50 p-6">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600">
                                <Lightbulb className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold text-blue-900">
                                    Pro Tip
                                </h4>
                                <p className="text-sm text-blue-800">
                                    Jobs with detailed descriptions get 40% more
                                    quality applicants. Keep your postings
                                    updated!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
