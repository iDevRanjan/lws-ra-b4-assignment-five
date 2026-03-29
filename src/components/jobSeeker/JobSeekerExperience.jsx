import { formatDate } from "../../utils/formatDate";
import { getDateDifference } from "../../utils/getDateDifference";

export default function JobSeekerExperience({ profileDataExperience = [] }) {
    return (
        <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold">Work Experience</h2>
            <div className="space-y-6">
                {profileDataExperience.length > 0 ? (
                    profileDataExperience?.map((experience, index) => (
                        <div
                            key={experience.companyName}
                            className="border-border relative border-l-2 pb-6 pl-8 last:pb-0"
                        >
                            <div
                                className={`${index > 0 && experience.endDate ? "bg-secondary" : "bg-primary"} absolute top-0 -left-2 h-4 w-4 rounded-full border-2 border-white`}
                            />
                            <div>
                                <h3 className="mb-1 font-semibold">
                                    {experience.title}
                                </h3>
                                <p className="text-muted-foreground mb-2 text-sm">
                                    {experience.location} •{" "}
                                    {experience.employmentType}
                                </p>
                                <p className="text-muted-foreground mb-3 text-xs">
                                    {formatDate(experience.startDate)} -{" "}
                                    {formatDate(experience.endDate) ??
                                        "Present"}{" "}
                                    •{" "}
                                    {getDateDifference(
                                        experience.startDate,
                                        experience.endDate,
                                    )}
                                </p>
                                <p className="text-foreground text-sm">
                                    {experience.description}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground py-4 text-center">
                        No working experience
                    </p>
                )}
            </div>
        </div>
    );
}
