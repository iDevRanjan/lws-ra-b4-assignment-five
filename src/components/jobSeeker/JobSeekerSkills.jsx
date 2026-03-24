export default function JobSeekerSkills({ profileDataSkills = [] }) {
    return (
        <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {profileDataSkills.length > 0 ? (
                    profileDataSkills?.map((skill) => (
                        <span key={skill} className="badge badge-secondary">
                            {skill}
                        </span>
                    ))
                ) : (
                    <p className="text-muted-foreground py-4 text-center">
                        You have no skills
                    </p>
                )}
            </div>
        </div>
    );
}
