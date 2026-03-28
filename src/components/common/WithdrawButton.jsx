import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { withdrawApplicationMutationOption } from "../../services/mutationOptions";
import toast from "react-hot-toast";

export default function WithdrawButton({ applicationId }) {
    const { isPending, mutate: mutateWithdrawApplication } = useMutation(
        withdrawApplicationMutationOption(applicationId),
    );

    function handleClick() {
        if (!confirm("Are you sure you want to withdraw this application?"))
            return;

        mutateWithdrawApplication(undefined, {
            onSuccess: () => {
                toast.success("Application withdrawn successfully!");
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || error.message);
            },
        });
    }

    return (
        <button
            disabled={isPending}
            onClick={handleClick}
            className="btn text-primary-foreground w-full cursor-pointer bg-red-600 whitespace-nowrap hover:bg-red-700"
        >
            <X className="mr-2 size-4" /> Withdraw
        </button>
    );
}
