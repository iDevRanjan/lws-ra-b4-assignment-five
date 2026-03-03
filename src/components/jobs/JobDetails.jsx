import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getJobBySlugQueryOption } from "../../services/queryOptions";
import { getDateDifferenceFromNow } from "../../utils/getDateDifferenceFromNow";
import { sanitizedStringToArray } from "../../utils/sanitizedStringToArray";
import {
    BarChart,
    Bookmark,
    Briefcase,
    Calendar,
    Clock,
    Code,
    Cpu,
    DollarSign,
    Facebook,
    Flag,
    Globe,
    Layout,
    Link,
    Linkedin,
    MapPin,
    Send,
    Twitter,
    Users,
} from "lucide-react";

export default function JobDetails() {
    const params = useParams();

    const { data: jobDetails } = useQuery(
        getJobBySlugQueryOption(params.jobSlug),
    );

    const sanitizedJobRequirements = sanitizedStringToArray(
        jobDetails.data?.requirements,
    );
    const sanitizedJobBenefits = sanitizedStringToArray(
        jobDetails.data?.benefits,
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    {/* Job Header */}
                    <div className="card p-6">
                        <div className="flex items-start gap-4">
                            <div className="shrink-0">
                                <div className="bg-secondary flex h-20 w-20 items-center justify-center rounded-lg">
                                    <img
                                        src={jobDetails.data.company.logoUrl}
                                        alt={jobDetails.data.company.name}
                                    />
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="mb-3 flex items-start justify-between gap-4">
                                    <div>
                                        <h1 className="mb-2 text-3xl font-bold">
                                            {jobDetails.data.title}
                                        </h1>
                                        <div className="text-muted-foreground flex flex-wrap items-center gap-3">
                                            <a
                                                href="company-profile.html"
                                                className="hover:text-primary text-lg font-medium"
                                            >
                                                {jobDetails.data.company.name}
                                            </a>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {jobDetails.data.location}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {getDateDifferenceFromNow(
                                                    jobDetails.data.createdAt,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="btn-ghost shrink-0 p-2"
                                        title="Save job"
                                    >
                                        <Bookmark className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="badge badge-secondary">
                                        {jobDetails.data.type}
                                    </span>
                                    <span className="badge badge-outline">
                                        {jobDetails.data.workMode}
                                    </span>
                                    <span className="badge badge-outline">
                                        {jobDetails.data.experienceLevel}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Job Overview */}
                    <div className="card p-6">
                        <h2 className="mb-4 text-xl font-semibold">
                            Job Overview
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex items-start gap-3">
                                <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                                    <Briefcase className="text-primary h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">
                                        Job Type
                                    </p>
                                    <p className="font-medium">
                                        {jobDetails.data.type}
                                    </p>
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
                                    <p className="font-medium">
                                        {jobDetails.data.location}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                                    <DollarSign className="text-primary h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">
                                        Salary
                                    </p>
                                    <p className="font-medium">
                                        ${jobDetails.data.salaryMin / 1000}k - $
                                        {jobDetails.data.salaryMax / 1000}k /{" "}
                                        {jobDetails.data.salaryPeriod}
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
                                        {jobDetails.data.experienceLevel}
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
                                        {jobDetails.data.deadline ?? "N/A"}
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
                                        {jobDetails.data.applicants}{" "}
                                        applications
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Job Description */}
                    <div className="card p-6">
                        <h2 className="mb-4 text-xl font-semibold">
                            Job Description
                        </h2>
                        <div className="prose prose-sm text-foreground max-w-none space-y-4">
                            {jobDetails.data.description}
                            <h3 className="mt-6 mb-3 text-lg font-semibold">
                                Required Qualifications
                            </h3>
                            <ul className="text-muted-foreground list-inside list-disc space-y-2">
                                {sanitizedJobRequirements?.map(
                                    (requirement) => (
                                        <li key={requirement}>{requirement}</li>
                                    ),
                                )}
                            </ul>
                            <h3 className="mt-6 mb-3 text-lg font-semibold">
                                What We Offer
                            </h3>
                            <ul className="text-muted-foreground list-inside list-disc space-y-2">
                                {sanitizedJobBenefits?.map((benefits) => (
                                    <li key={benefits}>{benefits}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Required Skills */}
                    <div className="card p-6">
                        <h2 className="mb-4 text-xl font-semibold">
                            Required Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {jobDetails.data?.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="badge badge-secondary"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    {/* Similar Jobs */}
                    <div className="card p-6">
                        <h2 className="mb-4 text-xl font-semibold">
                            Similar Jobs
                        </h2>
                        <div className="space-y-4">
                            {/* Similar Job 1 */}
                            <article className="border-border border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex gap-4">
                                    <div className="shrink-0">
                                        <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-lg">
                                            <Code className="text-primary h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="mb-1 font-semibold">
                                            <a
                                                href="job-details.html"
                                                className="hover:underline"
                                            >
                                                Backend Developer
                                            </a>
                                        </h3>
                                        <p className="text-muted-foreground mb-2 text-sm">
                                            CloudScale Inc • Austin, TX • Remote
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary text-sm font-medium">
                                                $110k - $160k
                                            </span>
                                            <a
                                                href="job-details.html"
                                                className="text-primary text-sm hover:underline"
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            {/* Similar Job 2 */}
                            <article className="border-border border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex gap-4">
                                    <div className="shrink-0">
                                        <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-lg">
                                            <Layout className="text-primary h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="mb-1 font-semibold">
                                            <a
                                                href="job-details.html"
                                                className="hover:underline"
                                            >
                                                Frontend Developer (React)
                                            </a>
                                        </h3>
                                        <p className="text-muted-foreground mb-2 text-sm">
                                            Innovate Labs • Seattle, WA •
                                            On-site
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary text-sm font-medium">
                                                $95k - $140k
                                            </span>
                                            <a
                                                href="job-details.html"
                                                className="text-primary text-sm hover:underline"
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            {/* Similar Job 3 */}
                            <article className="border-border border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex gap-4">
                                    <div className="shrink-0">
                                        <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-lg">
                                            <Cpu className="text-primary h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="mb-1 font-semibold">
                                            <a
                                                href="job-details.html"
                                                className="hover:underline"
                                            >
                                                Software Engineer
                                            </a>
                                        </h3>
                                        <p className="text-muted-foreground mb-2 text-sm">
                                            Tech Innovations • Boston, MA •
                                            Hybrid
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-primary text-sm font-medium">
                                                $105k - $155k
                                            </span>
                                            <a
                                                href="job-details.html"
                                                className="text-primary text-sm hover:underline"
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
                {/* Sidebar Column */}
                <div className="space-y-6 lg:col-span-1">
                    {/* Apply Section (Sticky) */}
                    <div className="card p-6 lg:sticky lg:top-24">
                        <div className="space-y-4">
                            <div className="border-border border-b pb-4 text-center">
                                <p className="text-primary mb-1 text-2xl font-bold">
                                    ${jobDetails.data.salaryMin / 1000}k - $
                                    {jobDetails.data.salaryMax / 1000}k
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {jobDetails.data.salaryPeriod}
                                </p>
                            </div>
                            <button className="btn btn-primary w-full text-base">
                                <Send className="mr-2 h-4 w-4" />
                                Apply Now
                            </button>
                            <div className="border-border space-y-3 border-t pt-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Applicants
                                    </span>
                                    <span className="font-medium">
                                        {jobDetails.data.applicants}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Posted
                                    </span>
                                    <span className="font-medium">
                                        {getDateDifferenceFromNow(
                                            jobDetails.data.createdAt,
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Company Info */}
                    <div className="card p-6">
                        <h3 className="mb-4 text-lg font-semibold">
                            About Company
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-secondary flex h-16 w-16 shrink-0 items-center justify-center rounded-lg">
                                    <img
                                        src={jobDetails.data.company.logoUrl}
                                        alt={jobDetails.data.company.name}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold">
                                        {jobDetails.data.company.name}
                                    </h4>
                                    <p className="text-muted-foreground text-sm">
                                        {jobDetails.data.company.industry}
                                    </p>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                {jobDetails.data.company.description}
                            </p>
                            <div className="space-y-2 pt-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Globe className="text-muted-foreground h-4 w-4" />
                                    <a
                                        href="#"
                                        className="text-primary hover:underline"
                                    >
                                        {jobDetails.data.company.websiteUrl}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="text-muted-foreground h-4 w-4" />
                                    <span className="text-muted-foreground">
                                        {jobDetails.data.company.location}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Users className="text-muted-foreground h-4 w-4" />
                                    <span className="text-muted-foreground">
                                        {jobDetails.data.company.employeeCount}{" "}
                                        employees
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="text-muted-foreground h-4 w-4" />
                                    <span className="text-muted-foreground">
                                        Founded in{" "}
                                        {jobDetails.data.company.foundedYear}
                                    </span>
                                </div>
                            </div>
                            <a
                                href="../company/company-profile.html"
                                className="btn btn-outline mt-4 w-full"
                            >
                                View Company Profile
                            </a>
                        </div>
                    </div>
                    {/* Share Job */}
                    <div className="card p-6">
                        <h3 className="mb-4 text-lg font-semibold">
                            Share this Job
                        </h3>
                        <div className="flex gap-2">
                            <button
                                className="btn btn-outline flex-1"
                                title="Share on LinkedIn"
                            >
                                <Linkedin className="h-4 w-4" />
                            </button>
                            <button
                                className="btn btn-outline flex-1"
                                title="Share on Twitter"
                            >
                                <Twitter className="h-4 w-4" />
                            </button>
                            <button
                                className="btn btn-outline flex-1"
                                title="Share on Facebook"
                            >
                                <Facebook className="h-4 w-4" />
                            </button>
                            <button
                                className="btn btn-outline flex-1"
                                title="Copy link"
                            >
                                <Link className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    {/* Report Job */}
                    <button className="text-muted-foreground hover:text-foreground flex w-full items-center justify-center gap-2 text-sm">
                        <Flag className="h-4 w-4" />
                        Report this job
                    </button>
                </div>
            </div>
        </main>
    );
}
