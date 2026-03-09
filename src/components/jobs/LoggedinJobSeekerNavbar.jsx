import { User } from "lucide-react";
import { NavLink } from "react-router";

export default function LoggedinJobSeekerNavbar({ jobSeekerProfileData }) {
    console.log(jobSeekerProfileData);

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
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="bg-secondary flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                        {jobSeekerProfileData.profilePictureUrl ? (
                            <img
                                src={jobSeekerProfileData.profilePictureUrl}
                                alt={jobSeekerProfileData.name}
                            />
                        ) : (
                            <User className="text-color-primary h-4 w-4" />
                        )}
                    </div>
                    <span className="hidden text-sm font-medium md:inline">
                        {jobSeekerProfileData.name}
                    </span>
                </div>
            </div>
        </>
    );
}
