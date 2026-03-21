import { Outlet, useLoaderData } from "react-router";
import ExestingClient from "../components/common/ExestingClient";

export default function PublicRoutes() {
    const { isLoggedin, email } = useLoaderData();

    if (isLoggedin) return <ExestingClient email={email} />;

    return <Outlet />;
}
