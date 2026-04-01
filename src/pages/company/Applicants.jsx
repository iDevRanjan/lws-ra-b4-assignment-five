export default function Applicants() {
    return (
        <main className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                    <a
                        href="company-dashboard.html"
                        className="hover:text-primary"
                    >
                        Dashboard
                    </a>
                    <i data-lucide="chevron-right" className="h-4 w-4" />
                    <span className="text-foreground">Applicants</span>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold">
                            Job Applicants
                        </h1>
                        <p className="text-muted-foreground">
                            Review and manage applicants
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-semibold">Filters</h3>
                            <button className="text-primary text-sm hover:underline">
                                Reset
                            </button>
                        </div>
                        {/* Status Filter */}
                        <div className="mb-6">
                            <h4 className="mb-3 text-sm font-medium">
                                Application Status
                            </h4>
                            <div className="space-y-2">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked=""
                                        className="border-input rounded"
                                    />
                                    <span className="text-sm">
                                        New Applications
                                    </span>
                                    <span className="text-muted-foreground ml-auto text-xs">
                                        (8)
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked=""
                                        className="border-input rounded"
                                    />
                                    <span className="text-sm">Shortlisted</span>
                                    <span className="text-muted-foreground ml-auto text-xs">
                                        (8)
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="border-input rounded"
                                    />
                                    <span className="text-sm">Interviewed</span>
                                    <span className="text-muted-foreground ml-auto text-xs">
                                        (5)
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="border-input rounded"
                                    />
                                    <span className="text-sm">Rejected</span>
                                    <span className="text-muted-foreground ml-auto text-xs">
                                        (3)
                                    </span>
                                </label>
                            </div>
                        </div>
                        {/* Experience Filter */}
                        <div className="mb-6">
                            <h4 className="mb-3 text-sm font-medium">
                                Experience Level
                            </h4>
                            <div className="space-y-2">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="border-input rounded"
                                    />
                                    <span className="text-sm">
                                        Entry Level (0-2 years)
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked=""
                                        className="border-input rounded"
                                    />
                                    <span className="text-sm">
                                        Mid Level (3-5 years)
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        defaultChecked=""
                                        className="border-input rounded"
                                    />
                                    <span className="text-sm">
                                        Senior (5+ years)
                                    </span>
                                </label>
                            </div>
                        </div>
                        {/* Date Filter */}
                        <div>
                            <h4 className="mb-3 text-sm font-medium">
                                Applied Date
                            </h4>
                            <div className="space-y-2">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="date"
                                        defaultChecked=""
                                        className="border-input"
                                    />
                                    <span className="text-sm">
                                        Last 24 hours
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="date"
                                        className="border-input"
                                    />
                                    <span className="text-sm">Last 7 days</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="date"
                                        className="border-input"
                                    />
                                    <span className="text-sm">
                                        Last 30 days
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="radio"
                                        name="date"
                                        className="border-input"
                                    />
                                    <span className="text-sm">All time</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* Applicants List */}
                <div className="lg:col-span-3">
                    {/* Applicant Cards */}
                    <div className="space-y-4">
                        {/* Applicant 1 */}
                        <div className="card p-6 transition-shadow hover:shadow-md">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="shrink-0">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-xl font-bold text-white">
                                        JD
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold">
                                                John Doe
                                            </h3>
                                            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="mail"
                                                        className="h-3 w-3"
                                                    />
                                                    john.doe@example.com
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="briefcase"
                                                        className="h-3 w-3"
                                                    />
                                                    7 years experience
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="calendar"
                                                        className="h-3 w-3"
                                                    />
                                                    Applied 2 hours ago
                                                </span>
                                            </div>
                                        </div>
                                        <span className="badge badge-info">
                                            New
                                        </span>
                                    </div>
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        <span className="badge badge-secondary">
                                            JavaScript
                                        </span>
                                        <span className="badge badge-secondary">
                                            React
                                        </span>
                                        <span className="badge badge-secondary">
                                            Node.js
                                        </span>
                                        <span className="badge badge-secondary">
                                            TypeScript
                                        </span>
                                        <span className="badge badge-secondary">
                                            AWS
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <a
                                            href="#"
                                            className="btn btn-outline h-9 text-sm"
                                        >
                                            <i
                                                data-lucide="eye"
                                                className="mr-2 h-3 w-3"
                                            />
                                            View Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="btn btn-outline h-9 text-sm"
                                        >
                                            <i
                                                data-lucide="file-text"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Resume
                                        </a>
                                        <button className="btn btn-primary h-9 text-sm">
                                            <i
                                                data-lucide="user-check"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Shortlist
                                        </button>
                                        <button className="btn btn-outline h-9 text-sm text-red-600 hover:text-red-600">
                                            <i
                                                data-lucide="x-circle"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Applicant 2 */}
                        <div className="card p-6 transition-shadow hover:shadow-md">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="shrink-0">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-green-500 to-teal-600 text-xl font-bold text-white">
                                        SW
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold">
                                                Sarah Wilson
                                            </h3>
                                            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="mail"
                                                        className="h-3 w-3"
                                                    />
                                                    sarah.wilson@example.com
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="briefcase"
                                                        className="h-3 w-3"
                                                    />
                                                    5 years experience
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="calendar"
                                                        className="h-3 w-3"
                                                    />
                                                    Applied 5 hours ago
                                                </span>
                                            </div>
                                        </div>
                                        <span className="badge badge-success">
                                            Shortlisted
                                        </span>
                                    </div>
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        <span className="badge badge-secondary">
                                            React
                                        </span>
                                        <span className="badge badge-secondary">
                                            Vue.js
                                        </span>
                                        <span className="badge badge-secondary">
                                            Node.js
                                        </span>
                                        <span className="badge badge-secondary">
                                            MongoDB
                                        </span>
                                        <span className="badge badge-secondary">
                                            Docker
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <a
                                            href="#"
                                            className="btn btn-outline h-9 text-sm"
                                        >
                                            <i
                                                data-lucide="eye"
                                                className="mr-2 h-3 w-3"
                                            />
                                            View Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="btn btn-outline h-9 text-sm"
                                        >
                                            <i
                                                data-lucide="file-text"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Resume
                                        </a>
                                        <button className="btn btn-outline h-9 text-sm text-red-600 hover:text-red-600">
                                            <i
                                                data-lucide="x-circle"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Applicant 3 */}
                        <div className="card p-6 transition-shadow hover:shadow-md">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="shrink-0">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-red-600 text-xl font-bold text-white">
                                        MJ
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold">
                                                Michael Johnson
                                            </h3>
                                            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="mail"
                                                        className="h-3 w-3"
                                                    />
                                                    michael.j@example.com
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="briefcase"
                                                        className="h-3 w-3"
                                                    />
                                                    6 years experience
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="calendar"
                                                        className="h-3 w-3"
                                                    />
                                                    Applied 1 day ago
                                                </span>
                                            </div>
                                        </div>
                                        <span className="badge badge-info">
                                            New
                                        </span>
                                    </div>
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        <span className="badge badge-secondary">
                                            Full Stack
                                        </span>
                                        <span className="badge badge-secondary">
                                            Python
                                        </span>
                                        <span className="badge badge-secondary">
                                            Django
                                        </span>
                                        <span className="badge badge-secondary">
                                            PostgreSQL
                                        </span>
                                        <span className="badge badge-secondary">
                                            Redis
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <a
                                            href="#"
                                            className="btn btn-outline h-9 text-sm"
                                        >
                                            <i
                                                data-lucide="eye"
                                                className="mr-2 h-3 w-3"
                                            />
                                            View Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="btn btn-outline h-9 text-sm"
                                        >
                                            <i
                                                data-lucide="file-text"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Resume
                                        </a>
                                        <button className="btn btn-primary h-9 text-sm">
                                            <i
                                                data-lucide="user-check"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Shortlist
                                        </button>
                                        <button className="btn btn-outline h-9 text-sm text-red-600 hover:text-red-600">
                                            <i
                                                data-lucide="x-circle"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Applicant 4 */}
                        <div className="card p-6 transition-shadow hover:shadow-md">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="shrink-0">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-pink-500 to-rose-600 text-xl font-bold text-white">
                                        ED
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold">
                                                Emily Davis
                                            </h3>
                                            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="mail"
                                                        className="h-3 w-3"
                                                    />
                                                    emily.davis@example.com
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="briefcase"
                                                        className="h-3 w-3"
                                                    />
                                                    8 years experience
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="calendar"
                                                        className="h-3 w-3"
                                                    />
                                                    Applied 1 day ago
                                                </span>
                                            </div>
                                        </div>
                                        <span className="badge badge-success">
                                            Shortlisted
                                        </span>
                                    </div>
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        <span className="badge badge-secondary">
                                            Angular
                                        </span>
                                        <span className="badge badge-secondary">
                                            TypeScript
                                        </span>
                                        <span className="badge badge-secondary">
                                            RxJS
                                        </span>
                                        <span className="badge badge-secondary">
                                            NestJS
                                        </span>
                                        <span className="badge badge-secondary">
                                            GraphQL
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <a
                                            href="#"
                                            className="btn btn-outline h-9 text-sm"
                                        >
                                            <i
                                                data-lucide="eye"
                                                className="mr-2 h-3 w-3"
                                            />
                                            View Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="btn btn-outline h-9 text-sm"
                                        >
                                            <i
                                                data-lucide="file-text"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Resume
                                        </a>
                                        <button className="btn btn-outline h-9 text-sm text-red-600 hover:text-red-600">
                                            <i
                                                data-lucide="x-circle"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Applicant 5 */}
                        <div className="card p-6 transition-shadow hover:shadow-md">
                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="shrink-0">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white">
                                        RM
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold">
                                                Robert Martinez
                                            </h3>
                                            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="mail"
                                                        className="h-3 w-3"
                                                    />
                                                    robert.m@example.com
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="briefcase"
                                                        className="h-3 w-3"
                                                    />
                                                    4 years experience
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i
                                                        data-lucide="calendar"
                                                        className="h-3 w-3"
                                                    />
                                                    Applied 2 days ago
                                                </span>
                                            </div>
                                        </div>
                                        <span className="badge badge-info">
                                            New
                                        </span>
                                    </div>
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        <span className="badge badge-secondary">
                                            JavaScript
                                        </span>
                                        <span className="badge badge-secondary">
                                            Express
                                        </span>
                                        <span className="badge badge-secondary">
                                            MySQL
                                        </span>
                                        <span className="badge badge-secondary">
                                            Git
                                        </span>
                                        <span className="badge badge-secondary">
                                            Jenkins
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <a
                                            href="#"
                                            className="btn btn-outline h-9 text-sm"
                                        >
                                            <i
                                                data-lucide="eye"
                                                className="mr-2 h-3 w-3"
                                            />
                                            View Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="btn btn-outline h-9 text-sm"
                                        >
                                            <i
                                                data-lucide="file-text"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Resume
                                        </a>
                                        <button className="btn btn-primary h-9 text-sm">
                                            <i
                                                data-lucide="user-check"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Shortlist
                                        </button>
                                        <button className="btn btn-outline h-9 text-sm text-red-600 hover:text-red-600">
                                            <i
                                                data-lucide="x-circle"
                                                className="mr-2 h-3 w-3"
                                            />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Load More */}
                    <div className="mt-6 text-center">
                        <button className="btn btn-outline">
                            <i data-lucide="loader" className="mr-2 h-4 w-4" />
                            Load More Applicants
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
