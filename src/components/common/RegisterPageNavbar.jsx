import { Link } from "react-router";

export default function RegisterPageNavbar() {
    return (
        <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">
                Already have an account?
            </span>
            <Link to="login" className="btn btn-ghost text-sm">
                Sign In
            </Link>
        </div>
    );
}
