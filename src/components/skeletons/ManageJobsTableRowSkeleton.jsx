export default function ManageJobsTableRowSkeleton() {
    return (
        <tr>
            <td className="px-6 py-4">
                <div className="skeleton h-4 w-4 rounded-sm" />
            </td>
            <td className="px-6 py-4">
                <div>
                    <div className="skeleton mb-2 h-4 w-48" />
                    <div className="flex items-center gap-3 text-xs">
                        <div className="skeleton h-3 w-28" />
                        <div className="skeleton h-3 w-20" />
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="skeleton h-6 w-16 rounded-full" />
            </td>
            <td className="px-6 py-4">
                <div className="skeleton h-4 w-8" />
            </td>
            <td className="px-6 py-4">
                <div className="skeleton h-4 w-24" />
            </td>
            <td className="px-6 py-4">
                <div className="skeleton h-4 w-24" />
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                    <div className="skeleton h-8 w-8 rounded-md" />
                    <div className="skeleton h-8 w-8 rounded-md" />
                </div>
            </td>
        </tr>
    );
}
