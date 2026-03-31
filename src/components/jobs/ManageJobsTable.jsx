import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompanyJobMutationOption } from "../../services/mutationOptions";
import ManageJobsTableRowSkeleton from "../skeletons/ManageJobsTableRowSkeleton";
import ManageJobsTableRow from "./ManageJobsTableRow";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../utils/constants";

export default function ManageJobsTable({
    isPending,
    isError,
    error,
    openPositionsForOwn = {},
    isPlaceholderData,
    selectedItems = [],
    onSelectedItems,
}) {
    const { isPending: isDeleting, mutateAsync: mutateDeleteJobAsync } =
        useMutation(deleteCompanyJobMutationOption());

    const queryClient = useQueryClient();
    const openPositionsForOwnData = openPositionsForOwn?.data ?? [];
    const isAllItemSelected =
        openPositionsForOwnData.length > 0 &&
        openPositionsForOwnData.every((openPositionForOwn) =>
            selectedItems.includes(openPositionForOwn.id),
        );

    function handleSelectedItems(event) {
        const isTopCheckboxChecked = event.target.checked;
        const selectedItemsArray = openPositionsForOwnData.map(
            (openPositionForOwn) => openPositionForOwn.id,
        );

        onSelectedItems(isTopCheckboxChecked ? selectedItemsArray : []);
    }

    async function handleDeleteCompanyJob(applicationId) {
        if (!confirm("Are you sure you want to delete this job?")) return;

        try {
            await mutateDeleteJobAsync(applicationId);
            toast.success("Jobs deleted successfully!");
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.companyOpenPositionsForOwn],
            });

            const hasItem = selectedItems.includes(applicationId);
            if (hasItem) onSelectedItems(applicationId);
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || error.message;
            toast.error(`Delete failed: ${errorMessage}`);
        }
    }

    return (
        <div
            className="overflow-x-auto"
            style={{
                opacity: isPlaceholderData ? 0.5 : 1,
            }}
        >
            <table className="w-full text-center">
                <thead className="border-border bg-muted border-b">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium">
                            <div className="flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={isAllItemSelected}
                                    onChange={handleSelectedItems}
                                    className="accent-primary size-4 cursor-pointer"
                                />
                            </div>
                        </th>
                        <th className="px-6 py-4 text-sm font-medium">
                            Job Title
                        </th>
                        <th className="px-6 py-4 text-sm font-medium">
                            Status
                        </th>
                        <th className="px-6 py-4 text-sm font-medium">
                            Applicants
                        </th>
                        <th className="px-6 py-4 text-sm font-medium">
                            Posted Date
                        </th>
                        <th className="px-6 py-4 text-sm font-medium">
                            Expires
                        </th>
                        <th className="px-6 py-4 text-sm font-medium">
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
                                        onDeleteCompanyJob={
                                            handleDeleteCompanyJob
                                        }
                                        isDeleting={isDeleting}
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
