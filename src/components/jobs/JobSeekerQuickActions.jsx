import { Bookmark, Edit, FileText, Settings, User } from "lucide-react";
import { Link } from "react-router";

export default function JobSeekerQuickActions() {
    return (
        <div className="card p-6">
            <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
            <div className="space-y-2">
                <Link
                    to="/jobseeker-profile"
                    className="hover:bg-accent flex items-center gap-3 rounded-md p-3 transition-colors"
                >
                    <User className="text-muted-foreground h-5 w-5" />
                    <span className="text-sm font-medium">View Profile</span>
                </Link>
                <Link
                    to="/edit-jobseeker-profile"
                    className="hover:bg-accent flex items-center gap-3 rounded-md p-3 transition-colors"
                >
                    <Edit className="text-muted-foreground h-5 w-5" />
                    <span className="text-sm font-medium">Edit Profile</span>
                </Link>
                <Link
                    to="/jobseeker-applications"
                    className="hover:bg-accent flex items-center gap-3 rounded-md p-3 transition-colors"
                >
                    <FileText className="text-muted-foreground h-5 w-5" />
                    <span className="text-sm font-medium">My Applications</span>
                </Link>
                <Link
                    to="#"
                    className="hover:bg-accent flex items-center gap-3 rounded-md p-3 transition-colors"
                >
                    <Bookmark className="text-muted-foreground h-5 w-5" />
                    <span className="text-sm font-medium">Saved Jobs</span>
                </Link>
                <Link
                    to="#"
                    className="hover:bg-accent flex items-center gap-3 rounded-md p-3 transition-colors"
                >
                    <Settings className="text-muted-foreground h-5 w-5" />
                    <span className="text-sm font-medium">Settings</span>
                </Link>
            </div>
        </div>
    );
}
