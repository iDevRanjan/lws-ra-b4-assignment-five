import { User } from "lucide-react";

export default function JobSeekerAvatar({ jobSeekerProfileData, size }) {
    return (
        <div
            className="bg-secondary relative flex items-center justify-center overflow-hidden rounded-full"
            style={{
                width: `${size * 4}px`,
                height: `${size * 4}px`,
            }}
        >
            <User className="text-primary size-5" />
            {jobSeekerProfileData.profilePictureUrl && (
                <img
                    src={jobSeekerProfileData.profilePictureUrl}
                    alt={jobSeekerProfileData.name}
                    onError={(event) => {
                        event.target.style.display = "none";
                    }}
                    className="bg-secondary absolute h-auto object-cover"
                    style={{
                        width: `${size * 4}px`,
                    }}
                />
            )}
        </div>
    );
}
