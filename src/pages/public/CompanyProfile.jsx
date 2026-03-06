import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getCompanyBySlugQueryOption } from "../../services/queryOptions";
import CompanySocialMedia from "../../components/company/CompanySocialMedia";
import OpenPositions from "../../components/company/OpenPositions";
import ContactInformation from "../../components/company/ContactInformation";
import CompanyProfileHeader from "../../components/company/CompanyProfileHeader";
import CompanyCultureValues from "../../components/company/CompanyCultureValues";

export default function CompanyProfile() {
    const params = useParams();

    const { data: companyProfile } = useSuspenseQuery(
        getCompanyBySlugQueryOption(params.companySlug),
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <CompanyProfileHeader companyProfileData={companyProfile.data} />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="card p-6">
                        <h2 className="mb-4 text-xl font-semibold">
                            About Company
                        </h2>
                        <div className="text-foreground space-y-4">
                            {companyProfile.data.description}
                        </div>
                    </div>
                    <CompanyCultureValues />
                    <OpenPositions companySlug={companyProfile.data.slug} />
                </div>
                <div className="space-y-6 lg:col-span-1">
                    <ContactInformation
                        companyProfileData={companyProfile.data}
                    />
                    <CompanySocialMedia
                        socialLinks={companyProfile.data.socialLinks}
                    />
                </div>
            </div>
        </main>
    );
}
