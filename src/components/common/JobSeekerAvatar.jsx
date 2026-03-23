import { User } from "lucide-react";

export default function JobSeekerAvatar({ jobSeekerProfileData, size }) {
    const URL = jobSeekerProfileData.profilePictureUrl.startsWith("http")
        ? jobSeekerProfileData.profilePictureUrl
        : `${import.meta.env.VITE_API_BASE_URL}${jobSeekerProfileData.profilePictureUrl}`;

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
                    key={jobSeekerProfileData.name}
                    src={URL}
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
