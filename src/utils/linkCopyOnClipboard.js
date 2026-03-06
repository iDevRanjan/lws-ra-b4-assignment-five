import toast from "react-hot-toast";

export async function linkCopyOnClipboard(url, successMessage, errorMessage) {
    if (!navigator.clipboard) {
        toast.error("Clipboard not supported in this browser");
        return;
    }

    try {
        await navigator.clipboard.writeText(url);
        toast.success(successMessage);
    } catch (error) {
        console.error("Clipboard error:", error);
        toast.error(errorMessage);
    }
}
