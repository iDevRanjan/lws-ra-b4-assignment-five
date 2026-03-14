import { Link } from "react-router";

export default function SignUpMenu() {
    return (
        <div className="card absolute top-full left-0 z-10 mt-2 w-48 p-2 shadow-lg">
            <Link
                to="jobseeker-register"
                className="hover:bg-accent block w-full rounded px-3 py-2 text-sm"
            >
                As a job seeker
            </Link>
            <Link
                to="company-register"
                className="hover:bg-accent block w-full rounded px-3 py-2 text-sm"
            >
                As a company
            </Link>
        </div>
    );
}
