import { Calendar, Edit, MapPin } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import JobSeekerAvatar from "../common/JobSeekerAvatar";
import { Link } from "react-router";

export default function JobSeekerProfileHeader({ profileData = {} }) {
    return (
        <div className="card mb-8 p-8">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                <div className="relative shrink-0">
                    <JobSeekerAvatar
                        jobSeekerProfileData={{
                            profilePictureUrl: profileData.profilePictureUrl,
                            name: profileData.name,
                        }}
                        size={32}
                    />
                </div>
                <div className="flex-1">
                    <div className="mb-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold">
                                {profileData.name}
                            </h1>
                            <p className="text-muted-foreground mb-2 text-lg">
                                {profileData.title ?? "N/A"}
                            </p>
                            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {profileData.location ?? "Earth"}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Member since{" "}
                                    {formatDate(profileData.createdAt)}
                                </span>
                            </div>
                        </div>
                        <Link
                            to="/edit-jobseeker-profile"
                            className="btn btn-primary"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
