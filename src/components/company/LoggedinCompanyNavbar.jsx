import { Building2, Plus } from "lucide-react";
import { Link, NavLink } from "react-router";
import CompanyAvatar from "../common/CompanyAvatar";

export default function LoggedinCompanyNavbar({ companyProfileData }) {
    return (
        <>
            <nav className="hidden items-center gap-6 md:flex">
                <NavLink
                    to="#"
                    className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="#"
                    className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                >
                    Manage Jobs
                </NavLink>
                <NavLink
                    to="#"
                    className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                >
                    Applicants
                </NavLink>
            </nav>
            <div className="flex items-center gap-4">
                <Link to="#" className="btn btn-primary">
                    <Plus data-lucide="plus" className="mr-2 h-4 w-4" />
                    Post Job
                </Link>
                <div className="flex items-center gap-2">
                    <CompanyAvatar companyInfo={companyProfileData} size={8} />
                    <span className="hidden text-sm font-medium md:inline">
                        {companyProfileData.name}
                    </span>
                </div>
            </div>
        </>
    );
}
