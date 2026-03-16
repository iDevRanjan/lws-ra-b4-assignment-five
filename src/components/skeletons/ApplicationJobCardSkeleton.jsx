export default function ApplicationJobCardSkeleton() {
    return (
        <article className="card p-4">
            <div className="flex items-start gap-4">
                <div className="skeleton h-12 w-12 shrink-0 rounded-lg"></div>
                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-start justify-between gap-2">
                        <div className="space-y-2">
                            <div className="skeleton h-4 w-48"></div>
                            <div className="skeleton h-3 w-32"></div>
                        </div>
                        <div className="skeleton h-5 w-24"></div>
                    </div>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                        <div className="skeleton h-3 w-28"></div>
                        <div className="skeleton h-3 w-32"></div>
                        <div className="skeleton h-3 w-24"></div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="skeleton h-8 w-20"></div>
                        <div className="skeleton h-8 w-32"></div>
                    </div>
                </div>
            </div>
        </article>
    );
}
