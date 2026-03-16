import { Plus } from "lucide-react";
import { Link, NavLink } from "react-router";
import CompanyAvatar from "../common/CompanyAvatar";
import { useState } from "react";
import NavbarNavigationMenu from "../common/NavbarNavigationMenu";

export default function LoggedinCompanyNavbar({ companyProfileData }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="hidden items-center gap-6 md:flex">
                <NavLink
                    to="company-dashboard"
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
                <button
                    className="relative flex cursor-pointer items-center gap-2"
                    tabIndex={0}
                    onClick={() => setOpen((prev) => !prev)}
                    onBlur={(event) => {
                        if (
                            !event.currentTarget.contains(event.relatedTarget)
                        ) {
                            setOpen(false);
                        }
                    }}
                >
                    <CompanyAvatar companyInfo={companyProfileData} size={8} />
                    <span className="hidden text-sm font-medium md:inline">
                        {companyProfileData.name}
                    </span>
                    {open && (
                        <NavbarNavigationMenu
                            toProfile="login"
                            toDashboard="company-register"
                        />
                    )}
                </button>
            </div>
        </>
    );
}
