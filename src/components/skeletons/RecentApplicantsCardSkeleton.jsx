export default function RecentApplicantsCardSkeleton() {
    return (
        <article className="p-6">
            <div className="flex flex-col gap-6 md:flex-row">
                <div className="shrink-0">
                    <div className="skeleton h-16 w-16 rounded-full" />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                            <div className="skeleton mb-2 h-5 w-40" />
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <div className="skeleton h-4 w-40" />
                                <div className="skeleton h-4 w-36" />
                            </div>
                        </div>
                        <div className="skeleton h-6 w-12 rounded-full" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <div className="skeleton h-8 w-28 rounded-md" />
                        <div className="skeleton h-8 w-24 rounded-md" />
                        <div className="skeleton h-8 w-24 rounded-md" />
                        <div className="skeleton h-8 w-28 rounded-md" />
                    </div>
                </div>
            </div>
        </article>
    );
}
