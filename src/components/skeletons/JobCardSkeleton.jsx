export default function JobCardSkeleton() {
    return (
        <article className="card p-6">
            <div className="flex flex-col gap-4 md:flex-row">
                <div className="shrink-0">
                    <div className="skeleton h-16 w-16" />
                </div>
                <div className="flex-1 space-y-3">
                    <div className="space-y-2">
                        <div className="skeleton h-6 w-2/3" />
                        <div className="skeleton h-4 w-1/2" />
                    </div>
                    <div className="skeleton h-4 w-full" />
                    <div className="flex gap-2">
                        <div className="skeleton h-6 w-20" />
                        <div className="skeleton h-6 w-20" />
                        <div className="skeleton h-6 w-20" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div className="skeleton h-4 w-32" />
                        <div className="flex gap-2">
                            <div className="skeleton h-10 w-28" />
                            <div className="skeleton h-10 w-28" />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
