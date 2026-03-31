import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Archive, PauseCircle, Trash2, XCircle } from "lucide-react";
import { updateCompanyJobStatusMutationOption } from "../../services/mutationOptions";
import { QUERY_KEYS } from "../../utils/constants";
import toast from "react-hot-toast";

export default function BulkJobActions({ selectedItems }) {
    const { mutateAsync: mutateJobStatusAsync } = useMutation(
        updateCompanyJobStatusMutationOption(),
    );

    const queryClient = useQueryClient();

    async function handleUpdateCompanyJobStatus(type) {
        const loadingToast = toast.loading("Updating jobs...");

        try {
            const updatePromises = selectedItems.map((selectedItemId) =>
                mutateJobStatusAsync({
                    applicationId: selectedItemId,
                    payload: {
                        status: type,
                    },
                }),
            );

            await Promise.all(updatePromises);

            toast.success(`Job status updated to ${type}!`, {
                id: loadingToast,
            });

            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.companyOpenPositionsForOwn],
            });
        } catch (error) {
            toast.error(`Update failed: ${error.message}`, {
                id: loadingToast,
            });
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
                        className="btn btn-outline h-9 text-sm text-green-600 hover:bg-green-50 disabled:opacity-50"
                    >
                        <Archive className="mr-2 h-3 w-3" />
                        Activate
                    </button>
                    <button
                        onClick={() => handleUpdateCompanyJobStatus("Archived")}
                        className="btn btn-outline h-9 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                        <PauseCircle className="mr-2 h-3 w-3" />
                        Archived
                    </button>
                    <button
                        onClick={() => handleUpdateCompanyJobStatus("Closed")}
                        className="btn btn-outline h-9 text-sm text-yellow-600 hover:bg-yellow-50 disabled:opacity-50"
                    >
                        <XCircle className="mr-2 h-3 w-3" />
                        Closed
                    </button>
                    <button className="btn btn-outline h-9 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50">
                        <Trash2 className="mr-2 h-3 w-3" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
