import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompanyJobMutationOption } from "../../services/mutationOptions";
import ManageJobsTableRowSkeleton from "../skeletons/ManageJobsTableRowSkeleton";
import ManageJobsTableRow from "./ManageJobsTableRow";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../utils/constants";
import { useCallback, useState } from "react";

export default function ManageJobsTable({
    isPending,
    isError,
    error,
    openPositionsForOwn = {},
    isPlaceholderData,
    selectedItems = [],
    onSelectedItems,
    onRowRemoveJob,
}) {
    const [deletingId, setDeletingId] = useState(null);
    const { mutateAsync: mutateDeleteJobAsync } = useMutation(
        deleteCompanyJobMutationOption(),
    );

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

    const handleDeleteCompanyJob = useCallback(
        async (applicationId) => {
            if (!confirm("Are you sure you want to delete this job?")) return;

            setDeletingId(applicationId);

            try {
                await mutateDeleteJobAsync(applicationId);
                toast.success("Jobs deleted successfully!");
                await queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.companyOpenPositionsForOwn],
                });

                onRowRemoveJob(applicationId);
            } catch (error) {
                const errorMessage =
                    error?.response?.data?.message || error.message;
                toast.error(`Delete failed: ${errorMessage}`);
            } finally {
                setDeletingId(null);
            }
        },
        [mutateDeleteJobAsync, queryClient, onRowRemoveJob],
    );

    function renderManageJobsTableRow() {
        if (!openPositionsForOwn?.success) {
            return null;
        }

        if (!(openPositionsForOwnData.length > 0)) {
            return (
                <tr>
                    <td
                        colSpan="100%"
                        className="text-muted-foreground py-4 text-center"
                    >
                        No jobs are available
                    </td>
                </tr>
            );
        }

        return openPositionsForOwnData.map((openPositionForOwn) => {
            const canBeChecked = selectedItems.includes(openPositionForOwn.id);

            return (
                <ManageJobsTableRow
                    key={openPositionForOwn.id}
                    openPositionForOwnData={openPositionForOwn}
                    canBeChecked={canBeChecked}
                    onSelectedItems={onSelectedItems}
                    onDeleteCompanyJob={handleDeleteCompanyJob}
                    isDeleting={deletingId === openPositionForOwn.id}
                />
            );
        });
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
                    {renderManageJobsTableRow()}
                </tbody>
            </table>
        </div>
    );
}
