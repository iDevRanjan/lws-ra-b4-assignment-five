import { X } from "lucide-react";

export default function WithdrawButton() {
    return (
        <button className="btn text-primary-foreground w-full cursor-pointer bg-red-600 whitespace-nowrap hover:bg-red-700">
            <X className="mr-2 size-4" /> Withdraw
        </button>
    );
}
