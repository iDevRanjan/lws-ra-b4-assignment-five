import { sanitizedStringToArray } from "../../utils/sanitizedStringToArray";

export default function JobDescription({ jobDetailsData }) {
    const sanitizedJobRequirements = sanitizedStringToArray(
        jobDetailsData?.requirements,
    );
    const sanitizedJobBenefits = sanitizedStringToArray(
        jobDetailsData?.benefits,
    );

    return (
        <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold">Job Description</h2>
            <div className="prose prose-sm text-foreground max-w-none space-y-4">
                {jobDetailsData.description}
                <h3 className="mt-6 mb-3 text-lg font-semibold">
                    Required Qualifications
                </h3>
                <ul className="text-muted-foreground list-inside list-disc space-y-2">
                    {sanitizedJobRequirements?.map((requirement) => (
                        <li key={requirement}>{requirement}</li>
                    ))}
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
    );
}
