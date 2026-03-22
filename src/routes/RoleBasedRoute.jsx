import { Outlet, useLoaderData } from "react-router";
import Unauthorized from "../pages/public/Unauthorized";

export default function RoleBasedRoute({ allowedRole }) {
    const { role } = useLoaderData();

    if (role !== allowedRole) {
        return <Unauthorized />;
    }

    return <Outlet />;
}
