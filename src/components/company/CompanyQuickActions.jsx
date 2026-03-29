import { List, Plus, Settings, Users } from "lucide-react";
import { Link } from "react-router";

export default function CompanyQuickActions() {
    return (
        <div className="card p-6">
            <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
            <div className="space-y-2">
                <Link
                    to="/create-job"
                    className="btn btn-primary w-full justify-start"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Job
                </Link>
                <Link
                    to="/manage-jobs"
                    className="btn btn-outline w-full justify-start"
                >
                    <List className="mr-2 h-4 w-4" />
                    Manage Jobs
                </Link>
                <Link
                    to="/applicants"
                    className="btn btn-outline w-full justify-start"
                >
                    <Users className="mr-2 h-4 w-4" />
                    View Applicants
                </Link>
                <Link
                    to="/edit-company-profile"
                    className="btn btn-outline w-full justify-start"
                >
                    <Settings className="mr-2 h-4 w-4" />
                    Company Settings
                </Link>
            </div>
        </div>
    );
}
