import JobSeekerProfileHeader from "../../components/jobSeeker/JobSeekerProfileHeader";
import JobSeekerContactInfo from "../../components/jobSeeker/JobSeekerContactInfo";
import JobSeekerExperience from "../../components/jobSeeker/JobSeekerExperience";
import JobSeekerSkills from "../../components/jobSeeker/JobSeekerSkills";
import JobSeekerEducation from "../../components/jobSeeker/JobSeekerEducation";
import JobSeekerSocialProfiles from "../../components/jobSeeker/JobSeekerSocialProfiles";
import JobSeekerResumeOnProfile from "../../components/jobSeeker/JobSeekerResumeOnProfile";
import { useProfile } from "../../hooks/useProfile";

export default function JobSeekerProfile() {
    const { data: jobSeekerProfile } = useProfile();

    return (
        <main className="container mx-auto px-4 py-8">
            <JobSeekerProfileHeader profileData={jobSeekerProfile?.data} />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="card p-6">
                        <h2 className="mb-4 text-xl font-semibold">About</h2>
                        <p className="text-foreground leading-relaxed">
                            {jobSeekerProfile?.data.bio ?? "N/A"}
                        </p>
                    </div>
                    <JobSeekerContactInfo
                        profileData={jobSeekerProfile?.data}
                    />
                    <JobSeekerSkills
                        profileDataSkills={jobSeekerProfile?.data.skills}
                    />
                    <JobSeekerExperience
                        profileDataExperience={
                            jobSeekerProfile?.data.experience
                        }
                    />
                    <JobSeekerEducation
                        profileDataEducation={jobSeekerProfile?.data.education}
                    />
                </div>
                <div className="space-y-6 lg:col-span-1">
                    <JobSeekerResumeOnProfile
                        profileData={jobSeekerProfile?.data}
                    />
                    <JobSeekerSocialProfiles
                        profileData={jobSeekerProfile?.data}
                    />
                </div>
            </div>
        </main>
    );
}
