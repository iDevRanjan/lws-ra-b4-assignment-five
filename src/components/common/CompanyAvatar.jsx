import { Building2 } from "lucide-react";

export default function CompanyAvatar({ companyInfo, size }) {
    return (
        <div
            className="bg-secondary relative flex items-center justify-center overflow-hidden rounded-lg"
            style={{
                width: `${size * 4}px`,
                height: `${size * 4}px`,
            }}
        >
            <Building2 className="text-primary size-5" />
            {companyInfo.logoUrl && (
                <img
                    key={companyInfo.name}
                    src={companyInfo.logoUrl}
                    alt={companyInfo.name}
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
