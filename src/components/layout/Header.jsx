import { Link } from "react-router";
import { Briefcase } from "lucide-react";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../hooks/useAuth";
import DefaultNavbar from "../common/DefaultNavbar";
import LoggedinJobSeekerNavbar from "../jobs/LoggedinJobSeekerNavbar";
import LoggedinCompanyNavbar from "../company/LoggedinCompanyNavbar";

export default function Header() {
    const { authData } = useAuth();
    const { data: clientProfileData } = useProfile();

    const role = clientProfileData?.data?.role;
    let NavbarComponent = <DefaultNavbar />;

    if (authData.isLoggedin && clientProfileData?.success) {
        if (role === "USER") {
            NavbarComponent = (
                <LoggedinJobSeekerNavbar
                    jobSeekerProfileData={clientProfileData.data}
                />
            );
        }

        if (role === "COMPANY") {
            NavbarComponent = (
                <LoggedinCompanyNavbar
                    companyProfileData={clientProfileData.data}
                />
            );
        }
    }

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
                {NavbarComponent}
            </div>
        </header>
    );
}
