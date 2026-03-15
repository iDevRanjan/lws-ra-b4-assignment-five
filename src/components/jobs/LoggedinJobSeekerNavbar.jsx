import { NavLink } from "react-router";
import NavbarNavigationMenu from "../common/NavbarNavigationMenu";
import { useState } from "react";
import JobSeekerAvatar from "../common/JobSeekerAvatar";

export default function LoggedinJobSeekerNavbar({ jobSeekerProfileData }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="hidden items-center gap-6 md:flex">
                <NavLink
                    to="#"
                    className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                >
                    Jobs
                </NavLink>
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
                    My Applications
                </NavLink>
            </nav>
            <button
                tabIndex={0}
                onClick={() => setOpen((prev) => !prev)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                        setOpen(false);
                    }
                }}
                className="relative flex cursor-pointer items-center gap-2"
            >
                <JobSeekerAvatar
                    jobSeekerProfileData={jobSeekerProfileData}
                    size={8}
                />
                <span className="hidden text-sm font-medium md:inline">
                    {jobSeekerProfileData.name}
                </span>
                {open && (
                    <NavbarNavigationMenu
                        toProfile="login"
                        toDashboard="jobseeker-register"
                    />
                )}
            </button>
        </>
    );
}
