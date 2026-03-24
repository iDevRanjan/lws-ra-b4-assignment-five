import { Github, Globe, Linkedin } from "lucide-react";
import { Link } from "react-router";

export default function JobSeekerSocialProfiles({ profileData = {} }) {
    return (
        <div className="card p-6">
            <h3 className="mb-4 text-lg font-semibold">Social Profiles</h3>
            <div className="space-y-2">
                <Link
                    to={`${profileData.linkedinUrl ?? "#"}`}
                    className="hover:bg-accent flex items-center gap-3 rounded-md p-2 transition-colors"
                >
                    <Linkedin className="text-muted-foreground h-5 w-5" />
                    <span className="text-sm font-medium">LinkedIn</span>
                </Link>
                <Link
                    to={`${profileData.githubUrl ?? "#"}`}
                    className="hover:bg-accent flex items-center gap-3 rounded-md p-2 transition-colors"
                >
                    <Github
                        data-lucide="github"
                        className="text-muted-foreground h-5 w-5"
                    />
                    <span className="text-sm font-medium">GitHub</span>
                </Link>
                <Link
                    to={`${profileData.portfolioUrl ?? "#"}`}
                    className="hover:bg-accent flex items-center gap-3 rounded-md p-2 transition-colors"
                >
                    <Globe className="text-muted-foreground h-5 w-5" />
                    <span className="text-sm font-medium">Portfolio</span>
                </Link>
            </div>
        </div>
    );
}
