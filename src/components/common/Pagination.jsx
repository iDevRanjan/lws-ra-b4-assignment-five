import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
    page,
    onPageChange,
    paginationArray,
    isPlaceholderData,
    totalPages,
}) {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
                disabled={page <= 1}
                className="btn btn-outline cursor-pointer disabled:opacity-50"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>
            <ul className="flex gap-2">
                {paginationArray?.map((item, i) => (
                    <li key={i}>
                        <button
                            onClick={() => {
                                if (item !== "...") {
                                    onPageChange(item);
                                }
                            }}
                            disabled={isPlaceholderData}
                            className={`flex size-10 cursor-pointer items-center justify-center rounded-full transition-all disabled:opacity-50 ${
                                page === item
                                    ? "btn-primary font-bold text-white"
                                    : item === "..."
                                      ? "cursor-default! text-gray-500"
                                      : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => {
                    if (!isPlaceholderData && page < totalPages) {
                        onPageChange((prev) => prev + 1);
                    }
                }}
                disabled={page >= totalPages || isPlaceholderData}
                className="btn btn-outline cursor-pointer disabled:opacity-50"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}
