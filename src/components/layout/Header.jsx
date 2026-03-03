import { Link } from "react-router";
import { Briefcase } from "lucide-react";

export default function Header() {
    return (
        <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <Link to={"/"} className="flex items-center space-x-2">
                        <Briefcase className="text-primary h-8 w-8" />
                        <span className="text-xl font-bold">
                            LWS Job Portal
                        </span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link to={"login"} className="btn btn-ghost text-sm">
                        Sign In
                    </Link>
                    <Link
                        to={"register-company"}
                        className="btn btn-primary text-sm"
                    >
                        Post a Job
                    </Link>
                </div>
            </div>
        </header>
    );
}
