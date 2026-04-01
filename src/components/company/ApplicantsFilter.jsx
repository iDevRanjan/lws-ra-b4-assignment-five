export default function ApplicantsFilter() {
    return (
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
                            <span className="text-sm">New Applications</span>
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
                            <span className="text-sm">Senior (5+ years)</span>
                        </label>
                    </div>
                </div>
                {/* Date Filter */}
                <div>
                    <h4 className="mb-3 text-sm font-medium">Applied Date</h4>
                    <div className="space-y-2">
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="radio"
                                name="date"
                                defaultChecked=""
                                className="border-input"
                            />
                            <span className="text-sm">Last 24 hours</span>
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
                            <span className="text-sm">Last 30 days</span>
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
    );
}
