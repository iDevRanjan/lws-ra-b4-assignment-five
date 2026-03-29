export default function RecentJobsCardSkeleton() {
    return (
        <article className="p-6">
            <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                    <div className="skeleton mb-2 h-5 w-2/3" />
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                        <div className="skeleton h-4 w-24" />
                        <div className="skeleton h-4 w-20" />
                        <div className="skeleton h-4 w-32" />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                    <div className="skeleton h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="skeleton h-8 w-16 rounded-md" />
                    <div className="skeleton h-8 w-16 rounded-md" />
                </div>
            </div>
        </article>
    );
}
