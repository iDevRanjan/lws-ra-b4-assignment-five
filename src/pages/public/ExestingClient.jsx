import { Home, LogOut } from "lucide-react";
import { useNavigate, useRevalidator } from "react-router";
import { authActions } from "../../store/actions/authActions";

export default function ExestingClient({ email }) {
    const navigate = useNavigate();
    const { revalidate } = useRevalidator();

    function handleClick() {
        authActions.logout();
        revalidate();
    }

    return (
        <main className="container mx-auto mt-16 flex items-center justify-center px-4">
            <div className="card w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-lg">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Home className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    You are already logged in!
                </h2>
                <p className="mb-8 text-gray-600">
                    Current session: <strong>{email}</strong>
                    <br />
                    You don't need to sign in or register again.
                </p>
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className="btn btn-primary flex w-full items-center justify-center gap-2 py-2.5"
                    >
                        <Home className="h-4 w-4" />
                        Go to Home
                    </button>
                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="border-border w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">
                                Or
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleClick}
                        className="btn btn-outline flex w-full items-center justify-center gap-2 border-red-200 py-2.5 text-red-600 hover:border-red-300 hover:bg-red-50"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout & Sign/Register in to different account
                    </button>
                </div>
            </div>
        </main>
    );
}
