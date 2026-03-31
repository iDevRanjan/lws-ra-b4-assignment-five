import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Archive, PauseCircle, Trash2, XCircle } from "lucide-react";
import {
    deleteCompanyJobMutationOption,
    updateCompanyJobStatusMutationOption,
} from "../../services/mutationOptions";
import { QUERY_KEYS } from "../../utils/constants";
import toast from "react-hot-toast";

export default function BulkJobActions({
    selectedItems,
    selectedDetails,
    resetSelectedItems,
}) {
    const { isPending: isUpdating, mutateAsync: mutateUpdateJobStatusAsync } =
        useMutation(updateCompanyJobStatusMutationOption());
    const { isPending: isDeleting, mutateAsync: mutateDeleteJobAsync } =
        useMutation(deleteCompanyJobMutationOption());

    const queryClient = useQueryClient();
    const isWorking = isUpdating || isDeleting;

    async function handleUpdateCompanyJobStatus(type) {
        const itemsToUpdate = selectedDetails.filter(
            (item) => item.status !== type,
        );

        if (itemsToUpdate.length === 0) {
            toast.error(`Selected jobs are already ${type}`);
            return;
        }

        const loadingToast = toast.loading(
            `Updating ${itemsToUpdate.length} job(s) to ${type}...`,
        );

        try {
            const updatePromises = itemsToUpdate.map((itemToUpdate) =>
                mutateUpdateJobStatusAsync({
                    applicationId: itemToUpdate.id,
                    payload: {
                        status: type,
                    },
                }),
            );

            await Promise.all(updatePromises);

            toast.success(
                `${itemsToUpdate.length} job(s) updated to ${type}!`,
                {
                    id: loadingToast,
                },
            );

            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.companyOpenPositionsForOwn],
            });
            resetSelectedItems();
        } catch (error) {
            toast.error(`Update failed: ${error.message}`, {
                id: loadingToast,
            });
        }
    }

    async function handleDeleteCompanyJob() {
        if (!confirm("Are you sure you want to delete these jobs?")) return;

        const loadingToast = toast.loading(
            `Deleting ${selectedItems.length} job(s)...`,
        );

        try {
            const deletePromises = selectedItems.map((selectedItemId) =>
                mutateDeleteJobAsync(selectedItemId),
            );

            await Promise.all(deletePromises);

            toast.success("Jobs deleted successfully!", { id: loadingToast });

            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.companyOpenPositionsForOwn],
            });
            resetSelectedItems();
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || error.message;
            toast.error(`Delete failed: ${errorMessage}`, { id: loadingToast });
        }
    }

    return (
        <div className="border-border border-t bg-gray-50 p-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                    <span>{selectedItems.length}</span> jobs selected
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleUpdateCompanyJobStatus("Active")}
                        disabled={isWorking}
                        className="btn btn-outline h-9 text-sm text-green-600 hover:bg-green-50 disabled:opacity-50"
                    >
                        <Archive className="mr-2 h-3 w-3" />
                        Activate
                    </button>
                    <button
                        onClick={() => handleUpdateCompanyJobStatus("Archived")}
                        disabled={isWorking}
                        className="btn btn-outline h-9 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                        <PauseCircle className="mr-2 h-3 w-3" />
                        Archived
                    </button>
                    <button
                        onClick={() => handleUpdateCompanyJobStatus("Closed")}
                        disabled={isWorking}
                        className="btn btn-outline h-9 text-sm text-yellow-600 hover:bg-yellow-50 disabled:opacity-50"
                    >
                        <XCircle className="mr-2 h-3 w-3" />
                        Closed
                    </button>
                    <button
                        onClick={handleDeleteCompanyJob}
                        disabled={isWorking}
                        className="btn btn-outline h-9 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                        <Trash2 className="mr-2 h-3 w-3" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
