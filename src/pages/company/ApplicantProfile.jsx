import { useSuspenseQuery } from "@tanstack/react-query";
import { getApplicantProfileQueryOption } from "../../services/queryOptions";
import { useParams } from "react-router";
import JobSeekerProfileHeader from "../../components/jobSeeker/JobSeekerProfileHeader";
import JobSeekerContactInfo from "../../components/jobSeeker/JobSeekerContactInfo";
import JobSeekerSkills from "../../components/jobSeeker/JobSeekerSkills";
import JobSeekerExperience from "../../components/jobSeeker/JobSeekerExperience";
import JobSeekerEducation from "../../components/jobSeeker/JobSeekerEducation";
import JobSeekerSocialProfiles from "../../components/jobSeeker/JobSeekerSocialProfiles";

export default function ApplicantProfile() {
    const params = useParams();

    const { data: applicantProfile } = useSuspenseQuery(
        getApplicantProfileQueryOption(params.applicantId),
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <JobSeekerProfileHeader profileData={applicantProfile?.data} />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="card p-6">
                        <h2 className="mb-4 text-xl font-semibold">About</h2>
                        <p className="text-foreground leading-relaxed">
                            {applicantProfile?.data.bio ?? "N/A"}
                        </p>
                    </div>
                    <JobSeekerContactInfo
                        profileData={applicantProfile?.data}
                    />
                    <JobSeekerSkills
                        profileDataSkills={applicantProfile?.data.skills}
                    />
                    <JobSeekerExperience
                        profileDataExperience={
                            applicantProfile?.data.experience
                        }
                    />
                    <JobSeekerEducation
                        profileDataEducation={applicantProfile?.data.education}
                    />
                </div>
                <div className="space-y-6 lg:col-span-1">
                    <JobSeekerSocialProfiles
                        profileData={applicantProfile?.data}
                    />
                </div>
            </div>
        </main>
    );
}
