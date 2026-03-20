import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";

export default function PrivateRoute() {
    const { authData } = useAuth();
    const { isPending, isError, error } = useProfile();

    if (!authData.isLoggedin) {
        return <Navigate to="login" replace={true} />;
    }

    if (authData.isLoggedin && isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Checking authentication...</p>
            </div>
        );
    }

    if (isError) {
        throw error;
    }

    return <Outlet />;
}
