import ManageJobsTableRowSkeleton from "../skeletons/ManageJobsTableRowSkeleton";
import ManageJobsTableRow from "./ManageJobsTableRow";

export default function ManageJobsTable({
    isPending,
    isError,
    error,
    openPositionsForOwn = {},
    isPlaceholderData,
    selectedItems = [],
    onSelectedItems,
    page,
}) {
    const openPositionsForOwnData = openPositionsForOwn?.data ?? [];

    function handleSelectedItems(event) {
        const isTopCheckboxChecked = event.target.checked;
        const selectedItemsArray = openPositionsForOwnData.map(
            (openPositionForOwn) => openPositionForOwn.id,
        );

        onSelectedItems(isTopCheckboxChecked ? selectedItemsArray : []);
    }

    const isAllItemSelected =
        openPositionsForOwnData.length > 0 &&
        openPositionsForOwnData.every((openPositionForOwn) =>
            selectedItems.includes(openPositionForOwn.id),
        );

    return (
        <div
            className="overflow-x-auto"
            style={{
                opacity: isPlaceholderData ? 0.5 : 1,
            }}
        >
            <table className="w-full">
                <thead className="border-border bg-muted border-b">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">
                            <input
                                key={page}
                                type="checkbox"
                                checked={isAllItemSelected}
                                onChange={handleSelectedItems}
                            />
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium">
                            Job Title
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium">
                            Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium">
                            Applicants
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium">
                            Posted Date
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium">
                            Expires
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-medium">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-border divide-y">
                    {isPending && <ManageJobsTableRowSkeleton />}
                    {isError && (
                        <tr>
                            <td
                                colSpan="100%"
                                className="py-4 text-center text-red-600"
                            >
                                {error.message}
                            </td>
                        </tr>
                    )}
                    {openPositionsForOwn?.success &&
                        (openPositionsForOwnData.length > 0 ? (
                            openPositionsForOwnData.map(
                                (openPositionForOwn) => (
                                    <ManageJobsTableRow
                                        key={openPositionForOwn.id}
                                        openPositionForOwnData={
                                            openPositionForOwn
                                        }
                                        selectedItems={selectedItems}
                                        onSelectedItems={onSelectedItems}
                                    />
                                ),
                            )
                        ) : (
                            <tr>
                                <td
                                    colSpan="100%"
                                    className="text-muted-foreground py-4 text-center"
                                >
                                    No jobs are available
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
