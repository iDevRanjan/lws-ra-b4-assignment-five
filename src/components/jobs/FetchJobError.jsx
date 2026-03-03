import { CircleAlert } from "lucide-react";

export default function FetchJobError({ refetch }) {
    return (
        <div className="card p-12 text-center" id="error-state">
            <CircleAlert className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">Something went wrong</h3>
            <p className="text-muted-foreground mb-4 text-sm">
                We couldn't load the jobs. Please try again.
            </p>
            <button onClick={refetch} className="btn btn-primary">
                Retry
            </button>
        </div>
    );
}
