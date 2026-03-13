import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import ExestingClient from "../components/common/ExestingClient";

export default function PublicRoutes() {
    const { authData, logout } = useAuth();
    const { isPending, data: clientProfileData } = useProfile();
    const { state } = useLocation();

    if (authData.isLoggedin && state?.isFreshLoggedin)
        return <Navigate to="/" />;

    if (authData.isLoggedin && isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Checking authentication...</p>
            </div>
        );
    }

    if (authData.isLoggedin && clientProfileData?.success) {
        return (
            <ExestingClient
                clientProfileData={clientProfileData}
                logout={logout}
            />
        );
    }

    return <Outlet />;
}
