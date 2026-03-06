import { Globe, Mail, MapPin, Phone } from "lucide-react";

export default function ContactInformation({ companyProfileData }) {
    return (
        <div className="card p-6">
            <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
            <div className="space-y-3">
                <div className="flex items-start gap-3">
                    <Globe className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                        <p className="text-muted-foreground mb-1 text-sm">
                            Website
                        </p>
                        <a
                            target="_blank"
                            href={companyProfileData.websiteUrl}
                            className="text-primary text-sm font-medium hover:underline"
                        >
                            {companyProfileData.websiteUrl}
                        </a>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Mail className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                        <p className="text-muted-foreground mb-1 text-sm">
                            Email
                        </p>
                        <a
                            href="mailto:careers@techcorp.com"
                            className="text-primary text-sm font-medium hover:underline"
                        >
                            {companyProfileData.email}
                        </a>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Phone className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                        <p className="text-muted-foreground mb-1 text-sm">
                            Phone
                        </p>
                        <a
                            href="tel:+14155551234"
                            className="text-sm font-medium"
                        >
                            {companyProfileData.phone}
                        </a>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <MapPin className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                        <p className="text-muted-foreground mb-1 text-sm">
                            Headquarters
                        </p>
                        <p className="text-sm font-medium">
                            {companyProfileData.location}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
