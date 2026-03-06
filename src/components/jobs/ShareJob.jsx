import { Facebook, Link, Linkedin, Twitter } from "lucide-react";
import { linkCopyOnClipboard } from "../../utils/linkCopyOnClipboard";

export default function ShareJob() {
    function handleClick() {
        const url = window.location.href;
        linkCopyOnClipboard(
            url,
            "Share job link copied to clipboard!",
            "Failed to copy URL",
        );
    }

    return (
        <div className="card p-6">
            <h3 className="mb-4 text-lg font-semibold">Share this Job</h3>
            <div className="flex gap-2">
                <button
                    className="btn btn-outline flex-1"
                    title="Share on LinkedIn"
                >
                    <Linkedin className="h-4 w-4" />
                </button>
                <button
                    className="btn btn-outline flex-1"
                    title="Share on Twitter"
                >
                    <Twitter className="h-4 w-4" />
                </button>
                <button
                    className="btn btn-outline flex-1"
                    title="Share on Facebook"
                >
                    <Facebook className="h-4 w-4" />
                </button>
                <button
                    onClick={handleClick}
                    className="btn btn-outline flex-1 cursor-pointer"
                    title="Copy link"
                >
                    <Link className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
