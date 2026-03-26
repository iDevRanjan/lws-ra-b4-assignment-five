import { Send } from "lucide-react";
import { store } from "../../store";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useState } from "react";
import { createPortal } from "react-dom";
import ApplyJobDialog from "../jobs/ApplyJobDialog";

export default function ApplyNowButton({ jobId }) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const authData = store.getState().authData;
    const isLoggedinJobSeeker = authData.isLoggedin && authData.role === "USER";

    function handleClick() {
        if (!isLoggedinJobSeeker) {
            toast("ℹ️ Please log in to continue");
            navigate("/login");
            return;
        }

        setShowModal(true);
    }

    return (
        <>
            <button
                onClick={handleClick}
                className="btn btn-primary w-full cursor-pointer whitespace-nowrap"
            >
                <Send className="mr-2 size-4" /> Apply Now
            </button>
            {showModal &&
                createPortal(
                    <ApplyJobDialog
                        jobId={jobId}
                        onClose={() => setShowModal(false)}
                    />,
                    document.getElementById("modal-container"),
                )}
        </>
    );
}
