import { ShieldAlert, Home } from "lucide-react";
import { useNavigate } from "react-router";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
            <div className="mb-6 text-red-500">
                <ShieldAlert size={80} strokeWidth={1.5} />
            </div>
            <h1 className="mb-2 text-6xl font-bold text-gray-800">403</h1>
            <h2 className="mb-4 text-center text-2xl font-semibold text-gray-700">
                Access Denied!
            </h2>
            <p className="mb-6 max-w-md text-center text-gray-500">
                Sorry, you do not have the necessary permissions to view this
                page. Please return to the homepage or your dashboard.
            </p>
            <button
                onClick={() => navigate("/")}
                className="btn btn-primary flex cursor-pointer items-center justify-center gap-2 py-2.5"
            >
                <Home className="h-4 w-4" />
                Go to Home
            </button>
        </main>
    );
}
