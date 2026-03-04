import { useNavigate, useRouteError } from "react-router";

export default function ErrorElement() {
    const error = useRouteError();
    const navigate = useNavigate();
    console.dir(error);

    return (
        <div className="flex flex-col items-center gap-5 py-20 text-center">
            <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
            <p>{error?.statusText || error?.message || "Page not found"}</p>
            <button
                onClick={() => navigate("/")}
                className="btn btn-primary max-w-fit cursor-pointer text-sm"
            >
                Go to home
            </button>
        </div>
    );
}
