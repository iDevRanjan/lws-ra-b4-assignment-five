import { Building, MapPin, Share2, Users } from "lucide-react";
import { linkCopyOnClipboard } from "../../utils/linkCopyOnClipboard";

export default function CompanyProfileHeader({ companyProfileData }) {
    function handleClick() {
        const url = window.location.href;
        linkCopyOnClipboard(
            url,
            "Share company link copied to clipboard!",
            "Failed to copy URL",
        );
    }

    return (
        <div className="card mb-8 p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="shrink-0">
                    <div className="bg-secondary flex h-32 w-32 items-center justify-center rounded-xl">
                        <img
                            src={companyProfileData.logoUrl}
                            alt={companyProfileData.name}
                        />
                    </div>
                </div>
                <div className="h-full flex-1 items-center">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold">
                                {companyProfileData.name}
                            </h1>
                            <div className="text-muted-foreground flex flex-wrap items-center gap-3">
                                <span className="flex items-center gap-1">
                                    <Building className="h-4 w-4" />
                                    {companyProfileData.industry}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {companyProfileData.location}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    {companyProfileData.employeeCount} employees
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleClick}
                                className="btn btn-outline cursor-pointer"
                            >
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
