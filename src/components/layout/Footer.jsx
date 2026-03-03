import { Link } from "react-router";

const footerData = [
    {
        id: "job-seekers",
        title: "For Job Seekers",
        links: [
            { id: 1, name: "Browse Jobs", to: "/" },
            { id: 2, name: "Companies", to: "/" },
            { id: 3, name: "Career Advice", to: "/" },
            { id: 4, name: "Salary Guide", to: "/" },
        ],
    },
    {
        id: "employers",
        title: "For Employers",
        links: [
            { id: 1, name: "Post a Job", to: "/" },
            { id: 2, name: "Browse Candidates", to: "/" },
            { id: 3, name: "Pricing", to: "/" },
            { id: 4, name: "Employer Resources", to: "/" },
        ],
    },
    {
        id: "company",
        title: "Company",
        links: [
            { id: 1, name: "About Us", to: "/" },
            { id: 2, name: "Contact", to: "/" },
            { id: 3, name: "Privacy Policy", to: "/" },
            { id: 4, name: "Terms of Service", to: "/" },
        ],
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-border bg-muted/30 mt-16 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 font-semibold">LWS Job Portal</h3>
                        <p className="text-muted-foreground text-sm">
                            Your trusted platform for finding the perfect job or
                            the perfect candidate.
                        </p>
                    </div>
                    {footerData.map((section) => (
                        <div key={section.id}>
                            <h4 className="mb-4 font-semibold">
                                {section.title}
                            </h4>

                            <ul className="text-muted-foreground space-y-2 text-sm">
                                {section.links.map((link) => (
                                    <li key={link.id}>
                                        <Link
                                            to={link.to}
                                            className="hover:text-foreground transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
                    <p>
                        &copy; {currentYear} LWS Job Portal. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
