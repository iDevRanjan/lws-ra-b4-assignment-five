import { Link, useLocation } from "react-router";
import { Briefcase } from "lucide-react";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../hooks/useAuth";
import DefaultNavbar from "../common/DefaultNavbar";
import LoggedinJobSeekerNavbar from "../jobSeeker/LoggedinJobSeekerNavbar";
import LoggedinCompanyNavbar from "../company/LoggedinCompanyNavbar";
import LoginPageNavbar from "../common/LoginPageNavbar";
import RegisterPageNavbar from "../common/RegisterPageNavbar";

export default function Header() {
    const { authData } = useAuth();
    const { data: clientProfileData } = useProfile();
    const location = useLocation();

    const role = clientProfileData?.data?.role;
    const isClientLoggedin = authData.isLoggedin && clientProfileData?.success;
    let NavbarComponent = <DefaultNavbar />;

    if (isClientLoggedin) {
        if (role === "USER") {
            NavbarComponent = (
                <LoggedinJobSeekerNavbar
                    jobSeekerProfileData={clientProfileData.data}
                />
            );
        } else if (role === "COMPANY") {
            NavbarComponent = (
                <LoggedinCompanyNavbar
                    companyProfileData={clientProfileData.data}
                />
            );
        }
    } else {
        if (location.pathname === "/login") {
            NavbarComponent = <LoginPageNavbar />;
        } else if (
            location.pathname === "/jobseeker-register" ||
            location.pathname === "/company-register"
        ) {
            NavbarComponent = <RegisterPageNavbar />;
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
