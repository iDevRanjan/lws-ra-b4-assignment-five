import {
    BarChart,
    Briefcase,
    Calendar,
    DollarSign,
    MapPin,
    Users,
} from "lucide-react";

export default function JobOverview({ jobDetailsData }) {
    return (
        <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold">Job Overview</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                    <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <Briefcase className="text-primary h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">
                            Job Type
                        </p>
                        <p className="font-medium">{jobDetailsData.type}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">
                            Location
                        </p>
                        <p className="font-medium">{jobDetailsData.location}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <DollarSign className="text-primary h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">Salary</p>
                        <p className="font-medium">
                            ${jobDetailsData.salaryMin / 1000}k - $
                            {jobDetailsData.salaryMax / 1000}k /{" "}
                            {jobDetailsData.salaryPeriod}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <BarChart className="text-primary h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">
                            Experience
                        </p>
                        <p className="font-medium">
                            {jobDetailsData.experienceLevel}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <Calendar className="text-primary h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">
                            Application Deadline
                        </p>
                        <p className="font-medium">
                            {jobDetailsData.deadline ?? "N/A"}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <Users className="text-primary h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">
                            Applicants
                        </p>
                        <p className="font-medium">
                            {jobDetailsData.applicants} applications
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
