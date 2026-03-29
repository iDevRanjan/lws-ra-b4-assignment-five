import { Briefcase, Clock, Edit, Eye, MapPin } from "lucide-react";
import { getDateDifferenceFromNow } from "../../utils/getDateDifferenceFromNow";
import { Link } from "react-router";

export default function RecentJobsCard({ openPositionForOwnData }) {
    return (
        <article className="p-6 transition-colors hover:bg-gray-50">
            <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="mb-1 font-semibold">
                        <Link
                            to={`/jobs/${openPositionForOwnData.slug}`}
                            className="hover:underline"
                        >
                            {openPositionForOwnData.title}
                        </Link>
                    </h3>
                    <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                        <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {openPositionForOwnData.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {openPositionForOwnData.type}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Posted{" "}
                            {getDateDifferenceFromNow(
                                openPositionForOwnData.createdAt,
                            )}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                        <span className="text-foreground font-semibold">
                            {openPositionForOwnData.applicants}
                        </span>{" "}
                        applicants
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        to={`/jobs/${openPositionForOwnData.slug}`}
                        className="btn btn-outline h-8 cursor-pointer text-xs"
                    >
                        <Eye className="mr-1 h-3 w-3" />
                        View
                    </Link>
                    <button className="btn btn-outline h-8 cursor-pointer text-xs">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                    </button>
                </div>
            </div>
        </article>
    );
}
