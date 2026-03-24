import { GraduationCap } from "lucide-react";

export default function JobSeekerEducation({ profileDataEducation = [] }) {
    return (
        <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold">Education</h2>
            <div className="space-y-4">
                {profileDataEducation.length > 0 ? (
                    profileDataEducation?.map((education) => (
                        <div key={education.startDate} className="flex gap-4">
                            <div className="bg-secondary flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                                <GraduationCap className="text-primary h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="mb-1 font-semibold">
                                    {education.degree}
                                </h3>
                                <p className="text-muted-foreground mb-1 text-sm">
                                    {education.schoolName}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    {new Date(
                                        education.startDate,
                                    ).getFullYear()}{" "}
                                    -{" "}
                                    {education.endDate
                                        ? new Date(
                                              education.endDate,
                                          ).getFullYear()
                                        : "Present"}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground py-4 text-center">
                        You have no education qualifications
                    </p>
                )}
            </div>
        </div>
    );
}
