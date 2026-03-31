import { Briefcase, Edit, MapPin, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { getJobStatusConfig } from "../../utils/getJobStatusConfig";
import { formatDate } from "../../utils/formatDate";

export default function ManageJobsTableRow({
    openPositionForOwnData,
    selectedItems,
    onSelectedItems,
}) {
    const canBeChecked = selectedItems.includes(openPositionForOwnData.id);

    const status = openPositionForOwnData?.status || "Active";
    const badgeConfig = getJobStatusConfig(status);

    return (
        <tr className="transition-colors hover:bg-gray-50">
            <td className="px-6 py-4">
                <input
                    type="checkbox"
                    checked={canBeChecked}
                    onChange={() => onSelectedItems(openPositionForOwnData.id)}
                />
            </td>
            <td className="px-6 py-4">
                <div>
                    <Link
                        to={`/jobs/${openPositionForOwnData.slug}`}
                        className="hover:text-primary font-medium"
                    >
                        {openPositionForOwnData.title}
                    </Link>
                    <div className="text-muted-foreground mt-1 flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {openPositionForOwnData.location}
                        </span>
                        <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {openPositionForOwnData.type}
                        </span>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`badge ${badgeConfig.className}`}>
                    {badgeConfig.label}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className="font-medium">
                        {openPositionForOwnData.applicants}
                    </span>
                </div>
            </td>
            <td className="text-muted-foreground px-6 py-4 text-sm">
                {formatDate(openPositionForOwnData.createdAt)}
            </td>
            <td className="text-muted-foreground px-6 py-4 text-sm">
                {formatDate(openPositionForOwnData.deadline) ?? "N/A"}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                    <button
                        className="btn hover:bg-accent size-10 cursor-pointer rounded-full p-2"
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                    <button
                        className="btn hover:bg-accent size-10 cursor-pointer rounded-full p-2 text-red-600"
                        title="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
