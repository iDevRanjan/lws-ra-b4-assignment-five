import { Link } from "react-router";

export default function DefaultNavbar() {
    return (
        <div className="flex items-center gap-4">
            <Link to={"login"} className="btn btn-ghost text-sm">
                Sign In
            </Link>
            <Link to={"company-register"} className="btn btn-primary text-sm">
                Post a Job
            </Link>
        </div>
    );
}
