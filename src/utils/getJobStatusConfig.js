export function getJobStatusConfig(status) {
    if (!status) return;

    switch (status) {
        case "Active": {
            return {
                label: "Active",
                className:
                    "bg-green-100 text-green-700 border border-green-200",
            };
        }
        case "Closed": {
            return {
                label: "Closed",
                className: "bg-red-100 text-red-700 border border-red-200",
            };
        }
        case "Archived": {
            return {
                label: "Archived",
                className:
                    "bg-amber-100 text-amber-700 border border-amber-200",
            };
        }
        default: {
            return {
                label: status,
                className: "bg-gray-100 text-gray-600 border border-gray-200",
            };
        }
    }
}
