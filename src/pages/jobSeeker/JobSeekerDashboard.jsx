import { Link } from "react-router";
import RecentApplicationsContainer from "../../components/jobs/RecentApplicationsContainer";
import RecommendedJobsContainer from "../../components/jobs/RecommendedJobsContainer";

export default function JobSeekerDashboard() {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold">
                    Welcome back, John! 👋
                </h1>
                <p className="text-muted-foreground">
                    Here's what's happening with your job search today.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                Recent Applications
                            </h2>
                            <Link
                                to="/jobseeker-applications"
                                className="text-primary text-sm hover:underline"
                            >
                                View All
                            </Link>
                        </div>
                        <RecentApplicationsContainer />
                    </div>
                    <div className="card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                Recommended for You
                            </h2>
                            <Link
                                to="/"
                                className="text-primary text-sm hover:underline"
                            >
                                Browse All Jobs
                            </Link>
                        </div>
                        <RecommendedJobsContainer />
                    </div>
                </div>
                {/* Sidebar Column */}
                <div className="space-y-6 lg:col-span-1">
                    {/* Quick Actions */}
                    <div className="card p-6">
                        <h3 className="mb-4 text-lg font-semibold">
                            Quick Actions
                        </h3>
                        <div className="space-y-2">
                            <a
                                href="user-profile.html"
                                className="hover:bg-accent flex items-center gap-3 rounded-md p-3 transition-colors"
                            >
                                <i
                                    data-lucide="user"
                                    className="text-muted-foreground h-5 w-5"
                                />
                                <span className="text-sm font-medium">
                                    View Profile
                                </span>
                            </a>
                            <a
                                href="edit-user-profile.html"
                                className="hover:bg-accent flex items-center gap-3 rounded-md p-3 transition-colors"
                            >
                                <i
                                    data-lucide="edit"
                                    className="text-muted-foreground h-5 w-5"
                                />
                                <span className="text-sm font-medium">
                                    Edit Profile
                                </span>
                            </a>
                            <a
                                href="applied-jobs.html"
                                className="hover:bg-accent flex items-center gap-3 rounded-md p-3 transition-colors"
                            >
                                <i
                                    data-lucide="file-text"
                                    className="text-muted-foreground h-5 w-5"
                                />
                                <span className="text-sm font-medium">
                                    My Applications
                                </span>
                            </a>
                            <a
                                href="#"
                                className="hover:bg-accent flex items-center gap-3 rounded-md p-3 transition-colors"
                            >
                                <i
                                    data-lucide="bookmark"
                                    className="text-muted-foreground h-5 w-5"
                                />
                                <span className="text-sm font-medium">
                                    Saved Jobs
                                </span>
                            </a>
                            <a
                                href="#"
                                className="hover:bg-accent flex items-center gap-3 rounded-md p-3 transition-colors"
                            >
                                <i
                                    data-lucide="settings"
                                    className="text-muted-foreground h-5 w-5"
                                />
                                <span className="text-sm font-medium">
                                    Settings
                                </span>
                            </a>
                        </div>
                    </div>
                    {/* Tips */}
                    <div className="card border-blue-200 bg-blue-50 p-6">
                        <div className="mb-3 flex items-start gap-3">
                            <i
                                data-lucide="lightbulb"
                                className="h-5 w-5 shrink-0 text-blue-600"
                            />
                            <div>
                                <h3 className="mb-1 text-sm font-semibold text-blue-900">
                                    Pro Tip
                                </h3>
                                <p className="text-xs text-blue-700">
                                    Applications submitted within 24 hours of
                                    posting have a 3x higher response rate.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
