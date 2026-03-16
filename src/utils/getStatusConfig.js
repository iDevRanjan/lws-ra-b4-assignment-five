export function getStatusConfig(status) {
    if (!status) return;

    switch (status) {
        case "New": {
            return {
                label: "Applied",
                className: "bg-blue-100 text-blue-800",
            };
        }
        case "Shortlisted": {
            return {
                label: "Shortlisted",
                className: "bg-yellow-100 text-yellow-800",
            };
        }
        case "Interviewed": {
            return {
                label: "Interviewed",
                className: "bg-purple-100 text-purple-800",
            };
        }
        case "Rejected": {
            return {
                label: "Rejected",
                className: "bg-red-100 text-red-800",
            };
        }
        case "Hired": {
            return {
                label: "Hired",
                className: "bg-green-100 text-green-800",
            };
        }
        default: {
            return {
                label: status || "Unknown",
                className: "bg-gray-100 text-gray-800",
            };
        }
    }
}
