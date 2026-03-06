import { Calendar, Globe, MapPin, Users } from "lucide-react";
import { Link } from "react-router";

export default function CompanyInfo({ companyInfo }) {
    return (
        <div className="card p-6">
            <h3 className="mb-4 text-lg font-semibold">About Company</h3>
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="bg-secondary flex h-16 w-16 shrink-0 items-center justify-center rounded-lg">
                        <img src={companyInfo.logoUrl} alt={companyInfo.name} />
                    </div>
                    <div>
                        <h4 className="font-semibold">{companyInfo.name}</h4>
                        <p className="text-muted-foreground text-sm">
                            {companyInfo.industry}
                        </p>
                    </div>
                </div>
                <p className="text-muted-foreground text-sm">
                    {companyInfo.description}
                </p>
                <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Globe className="text-muted-foreground h-4 w-4" />
                        <a
                            target="_blank"
                            href={`${companyInfo.websiteUrl}`}
                            className="text-primary hover:underline"
                        >
                            {companyInfo.websiteUrl}
                        </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground">
                            {companyInfo.location}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Users className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground">
                            {companyInfo.employeeCount} employees
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground">
                            Founded in {companyInfo.foundedYear}
                        </span>
                    </div>
                </div>
                <Link
                    to={`/companies/${companyInfo.slug}`}
                    className="btn btn-outline mt-4 w-full"
                >
                    View Company Profile
                </Link>
            </div>
        </div>
    );
}
