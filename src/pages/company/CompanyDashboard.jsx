export default function CompanyDashboard() {
    return (
        <main className="container mx-auto px-4 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold">
                    Welcome back, TechCorp! 👋
                </h1>
                <p className="text-[hsl(var(--color-muted-foreground))]">
                    Here's what's happening with your job postings today
                </p>
            </div>
            {/* Stats Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Stat Card 1 */}
                <div className="card p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                            <i
                                data-lucide="briefcase"
                                className="h-6 w-6 text-blue-600"
                            />
                        </div>
                    </div>
                    <h3 className="mb-1 text-2xl font-bold">24</h3>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                        Active Jobs
                    </p>
                </div>
                {/* Stat Card 2 */}
                <div className="card p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                            <i
                                data-lucide="users"
                                className="h-6 w-6 text-green-600"
                            />
                        </div>
                    </div>
                    <h3 className="mb-1 text-2xl font-bold">156</h3>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                        Total Applicants
                    </p>
                </div>
                {/* Stat Card 3 */}
                <div className="card p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                            <i
                                data-lucide="clock"
                                className="h-6 w-6 text-yellow-600"
                            />
                        </div>
                    </div>
                    <h3 className="mb-1 text-2xl font-bold">32</h3>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                        Pending Reviews
                    </p>
                </div>
                {/* Stat Card 4 */}
                <div className="card p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                            <i
                                data-lucide="star"
                                className="h-6 w-6 text-purple-600"
                            />
                        </div>
                    </div>
                    <h3 className="mb-1 text-2xl font-bold">18</h3>
                    <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                        Shortlisted
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Main Content Column */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Recent Jobs */}
                    <div className="card">
                        <div className="border-b border-[hsl(var(--color-border))] p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    Recent Job Posts
                                </h2>
                                <a
                                    href="#"
                                    className="text-sm text-[hsl(var(--color-primary))] hover:underline"
                                >
                                    View All
                                </a>
                            </div>
                        </div>
                        <div className="divide-y divide-[hsl(var(--color-border))]">
                            {/* Job Item 1 */}
                            <div className="p-6 transition-colors hover:bg-[hsl(var(--color-accent))]">
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="mb-1 font-semibold">
                                            <a
                                                href="#"
                                                className="hover:text-[hsl(var(--color-primary))]"
                                            >
                                                Senior Full Stack Developer
                                            </a>
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]">
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="map-pin"
                                                    className="h-3 w-3"
                                                />
                                                San Francisco, CA
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="briefcase"
                                                    className="h-3 w-3"
                                                />
                                                Full-time
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="clock"
                                                    className="h-3 w-3"
                                                />
                                                Posted 2 days ago
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-[hsl(var(--color-muted-foreground))]">
                                            <span className="font-semibold text-[hsl(var(--color-foreground))]">
                                                24
                                            </span>
                                            applicants
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="btn btn-outline h-8 text-xs">
                                            <i
                                                data-lucide="eye"
                                                className="mr-1 h-3 w-3"
                                            />
                                            View
                                        </button>
                                        <button className="btn btn-outline h-8 text-xs">
                                            <i
                                                data-lucide="edit"
                                                className="mr-1 h-3 w-3"
                                            />
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Job Item 2 */}
                            <div className="p-6 transition-colors hover:bg-[hsl(var(--color-accent))]">
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="mb-1 font-semibold">
                                            <a
                                                href="#"
                                                className="hover:text-[hsl(var(--color-primary))]"
                                            >
                                                Frontend Developer
                                            </a>
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]">
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="map-pin"
                                                    className="h-3 w-3"
                                                />
                                                Remote
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="briefcase"
                                                    className="h-3 w-3"
                                                />
                                                Full-time
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="clock"
                                                    className="h-3 w-3"
                                                />
                                                Posted 5 days ago
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-[hsl(var(--color-muted-foreground))]">
                                            <span className="font-semibold text-[hsl(var(--color-foreground))]">
                                                18
                                            </span>
                                            applicants
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="btn btn-outline h-8 text-xs">
                                            <i
                                                data-lucide="eye"
                                                className="mr-1 h-3 w-3"
                                            />
                                            View
                                        </button>
                                        <button className="btn btn-outline h-8 text-xs">
                                            <i
                                                data-lucide="edit"
                                                className="mr-1 h-3 w-3"
                                            />
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Job Item 3 */}
                            <div className="p-6 transition-colors hover:bg-[hsl(var(--color-accent))]">
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="mb-1 font-semibold">
                                            <a
                                                href="#"
                                                className="hover:text-[hsl(var(--color-primary))]"
                                            >
                                                Backend Engineer
                                            </a>
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]">
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="map-pin"
                                                    className="h-3 w-3"
                                                />
                                                Austin, TX
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="briefcase"
                                                    className="h-3 w-3"
                                                />
                                                Full-time
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="clock"
                                                    className="h-3 w-3"
                                                />
                                                Posted 1 week ago
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-[hsl(var(--color-muted-foreground))]">
                                            <span className="font-semibold text-[hsl(var(--color-foreground))]">
                                                32
                                            </span>
                                            applicants
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="btn btn-outline h-8 text-xs">
                                            <i
                                                data-lucide="eye"
                                                className="mr-1 h-3 w-3"
                                            />
                                            View
                                        </button>
                                        <button className="btn btn-outline h-8 text-xs">
                                            <i
                                                data-lucide="edit"
                                                className="mr-1 h-3 w-3"
                                            />
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Job Item 4 */}
                            <div className="p-6 transition-colors hover:bg-[hsl(var(--color-accent))]">
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="mb-1 font-semibold">
                                            <a
                                                href="#"
                                                className="hover:text-[hsl(var(--color-primary))]"
                                            >
                                                DevOps Engineer
                                            </a>
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]">
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="map-pin"
                                                    className="h-3 w-3"
                                                />
                                                Seattle, WA
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="briefcase"
                                                    className="h-3 w-3"
                                                />
                                                Full-time
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i
                                                    data-lucide="clock"
                                                    className="h-3 w-3"
                                                />
                                                Posted 2 weeks ago
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-[hsl(var(--color-muted-foreground))]">
                                            <span className="font-semibold text-[hsl(var(--color-foreground))]">
                                                15
                                            </span>
                                            applicants
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="btn btn-outline h-8 text-xs">
                                            <i
                                                data-lucide="eye"
                                                className="mr-1 h-3 w-3"
                                            />
                                            View
                                        </button>
                                        <button className="btn btn-outline h-8 text-xs">
                                            <i
                                                data-lucide="edit"
                                                className="mr-1 h-3 w-3"
                                            />
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Recent Applicants */}
                    <div className="card">
                        <div className="border-b border-[hsl(var(--color-border))] p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    Recent Applicants
                                </h2>
                                <a
                                    href="#"
                                    className="text-sm text-[hsl(var(--color-primary))] hover:underline"
                                >
                                    View All
                                </a>
                            </div>
                        </div>
                        <div className="divide-y divide-[hsl(var(--color-border))]">
                            {/* Applicant 1 */}
                            <div className="p-6 transition-colors hover:bg-[hsl(var(--color-accent))]">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--color-secondary))]">
                                        <i
                                            data-lucide="user"
                                            className="h-6 w-6 text-[hsl(var(--color-primary))]"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex items-start justify-between">
                                            <div>
                                                <h3 className="mb-1 font-semibold">
                                                    Sarah Johnson
                                                </h3>
                                                <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                                                    Applied for
                                                    <span className="font-medium text-[hsl(var(--color-foreground))]">
                                                        Senior Full Stack
                                                        Developer
                                                    </span>
                                                </p>
                                            </div>
                                            <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                                                2 hours ago
                                            </span>
                                        </div>
                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                            <span className="badge badge-secondary">
                                                React
                                            </span>
                                            <span className="badge badge-secondary">
                                                Node.js
                                            </span>
                                            <span className="badge badge-secondary">
                                                AWS
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="btn btn-primary h-8 text-xs">
                                                <i
                                                    data-lucide="check"
                                                    className="mr-1 h-3 w-3"
                                                />
                                                Shortlist
                                            </button>
                                            <button className="btn btn-outline h-8 text-xs">
                                                <i
                                                    data-lucide="eye"
                                                    className="mr-1 h-3 w-3"
                                                />
                                                View Profile
                                            </button>
                                            <button className="btn btn-outline h-8 text-xs">
                                                <i
                                                    data-lucide="download"
                                                    className="mr-1 h-3 w-3"
                                                />
                                                Resume
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Applicant 2 */}
                            <div className="p-6 transition-colors hover:bg-[hsl(var(--color-accent))]">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--color-secondary))]">
                                        <i
                                            data-lucide="user"
                                            className="h-6 w-6 text-[hsl(var(--color-primary))]"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex items-start justify-between">
                                            <div>
                                                <h3 className="mb-1 font-semibold">
                                                    Michael Chen
                                                </h3>
                                                <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                                                    Applied for
                                                    <span className="font-medium text-[hsl(var(--color-foreground))]">
                                                        Frontend Developer
                                                    </span>
                                                </p>
                                            </div>
                                            <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                                                5 hours ago
                                            </span>
                                        </div>
                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                            <span className="badge badge-secondary">
                                                Vue.js
                                            </span>
                                            <span className="badge badge-secondary">
                                                TypeScript
                                            </span>
                                            <span className="badge badge-secondary">
                                                CSS
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="btn btn-primary h-8 text-xs">
                                                <i
                                                    data-lucide="check"
                                                    className="mr-1 h-3 w-3"
                                                />
                                                Shortlist
                                            </button>
                                            <button className="btn btn-outline h-8 text-xs">
                                                <i
                                                    data-lucide="eye"
                                                    className="mr-1 h-3 w-3"
                                                />
                                                View Profile
                                            </button>
                                            <button className="btn btn-outline h-8 text-xs">
                                                <i
                                                    data-lucide="download"
                                                    className="mr-1 h-3 w-3"
                                                />
                                                Resume
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Applicant 3 */}
                            <div className="p-6 transition-colors hover:bg-[hsl(var(--color-accent))]">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--color-secondary))]">
                                        <i
                                            data-lucide="user"
                                            className="h-6 w-6 text-[hsl(var(--color-primary))]"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex items-start justify-between">
                                            <div>
                                                <h3 className="mb-1 font-semibold">
                                                    Emily Rodriguez
                                                </h3>
                                                <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
                                                    Applied for
                                                    <span className="font-medium text-[hsl(var(--color-foreground))]">
                                                        Backend Engineer
                                                    </span>
                                                </p>
                                            </div>
                                            <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                                                1 day ago
                                            </span>
                                        </div>
                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                            <span className="badge badge-secondary">
                                                Python
                                            </span>
                                            <span className="badge badge-secondary">
                                                Django
                                            </span>
                                            <span className="badge badge-secondary">
                                                PostgreSQL
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="btn btn-primary h-8 text-xs">
                                                <i
                                                    data-lucide="check"
                                                    className="mr-1 h-3 w-3"
                                                />
                                                Shortlist
                                            </button>
                                            <button className="btn btn-outline h-8 text-xs">
                                                <i
                                                    data-lucide="eye"
                                                    className="mr-1 h-3 w-3"
                                                />
                                                View Profile
                                            </button>
                                            <button className="btn btn-outline h-8 text-xs">
                                                <i
                                                    data-lucide="download"
                                                    className="mr-1 h-3 w-3"
                                                />
                                                Resume
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                href="#"
                                className="btn btn-primary w-full justify-start"
                            >
                                <i
                                    data-lucide="plus"
                                    className="mr-2 h-4 w-4"
                                />
                                Post New Job
                            </a>
                            <a
                                href="#"
                                className="btn btn-outline w-full justify-start"
                            >
                                <i
                                    data-lucide="list"
                                    className="mr-2 h-4 w-4"
                                />
                                Manage Jobs
                            </a>
                            <a
                                href="#"
                                className="btn btn-outline w-full justify-start"
                            >
                                <i
                                    data-lucide="users"
                                    className="mr-2 h-4 w-4"
                                />
                                View Applicants
                            </a>
                            <a
                                href="#"
                                className="btn btn-outline w-full justify-start"
                            >
                                <i
                                    data-lucide="settings"
                                    className="mr-2 h-4 w-4"
                                />
                                Company Settings
                            </a>
                        </div>
                    </div>
                    {/* Tips Card */}
                    <div className="card border-blue-200 bg-blue-50 p-6">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600">
                                <i
                                    data-lucide="lightbulb"
                                    className="h-5 w-5 text-white"
                                />
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
