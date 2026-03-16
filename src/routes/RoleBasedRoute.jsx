import { Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Unauthorized from "../pages/public/Unauthorized";

export default function RoleBasedRoute({ allowedRole }) {
    const { authData } = useAuth();

    if (authData.role !== allowedRole) {
        return <Unauthorized />;
    }

    return <Outlet />;
}
