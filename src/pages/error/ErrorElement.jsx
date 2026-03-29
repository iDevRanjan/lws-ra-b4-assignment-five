import { Home } from "lucide-react";
import { useNavigate, useRouteError } from "react-router";

export default function ErrorElement() {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center gap-5 py-20 text-center">
            <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
            <p>
                {error.response?.data?.message ||
                    error?.statusText ||
                    error?.message ||
                    "Page not found"}
            </p>
            <button
                onClick={() => navigate("/")}
                className="btn btn-primary flex items-center justify-center gap-2 py-2.5"
            >
                <Home className="h-4 w-4" />
                Go to Home
            </button>
        </div>
    );
}
