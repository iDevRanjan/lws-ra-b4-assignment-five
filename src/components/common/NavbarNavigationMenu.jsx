import { Link, useRevalidator } from "react-router";
import { authActions } from "../../store/actions/authActions";

export default function NavbarNavigationMenu({ toProfile, toDashboard }) {
    const { revalidate } = useRevalidator();

    function handleClick() {
        authActions.logout();
        revalidate();
    }

    return (
        <div className="card absolute top-full left-0 z-10 mt-2 w-48 cursor-pointer p-2 text-left shadow-lg">
            <Link
                to={toProfile}
                className="hover:bg-accent block w-full rounded px-3 py-2 text-sm"
            >
                Profile
            </Link>
            <Link
                to={toDashboard}
                className="hover:bg-accent block w-full rounded px-3 py-2 text-sm"
            >
                Dashboard
            </Link>
            <button
                onClick={handleClick}
                className="w-full cursor-pointer rounded px-3 py-2 text-left text-sm text-red-600 hover:bg-red-100"
            >
                Logout
            </button>
        </div>
    );
}
