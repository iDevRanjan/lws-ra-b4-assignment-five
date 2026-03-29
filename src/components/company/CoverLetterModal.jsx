import { X } from "lucide-react";

export default function CoverLetterModal({ onClose, content }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl">
                <div className="border-border flex items-center justify-between border-b p-4">
                    <h3 className="text-lg font-semibold">Cover Letter</h3>
                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto p-6">
                    <p className="leading-relaxed whitespace-pre-line text-gray-700">
                        {content || "No cover letter provided."}
                    </p>
                </div>
                <div className="border-border flex justify-end border-t p-4">
                    <button
                        onClick={onClose}
                        className="btn btn-outline h-9 cursor-pointer text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
