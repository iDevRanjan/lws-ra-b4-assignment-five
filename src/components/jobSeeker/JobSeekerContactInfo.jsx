import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";

export default function JobSeekerContactInfo({ profileData = {} }) {
    return (
        <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold">Contact Information</h2>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <Mail className="text-primary h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">Email</p>
                        <p className="font-medium">{profileData.email}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <Phone className="text-primary h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">Phone</p>
                        <p className="font-medium">{profileData.phone}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">
                            Location
                        </p>
                        <p className="font-medium">
                            {profileData.location ?? "Earth"}{" "}
                            {profileData.zipCode}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                        <Linkedin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-muted-foreground text-sm">
                            LinkedIn
                        </p>
                        <Link
                            to={`${profileData.linkedinUrl ?? "#"}`}
                            className="text-primary font-medium hover:underline"
                        >
                            {profileData.linkedinUrl ??
                                "https://www.linkedin.com"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
