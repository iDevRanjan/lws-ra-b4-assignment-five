import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { SocialMediaComponent } from "../common/SocialMediaComponent";

const ICONS = {
    linkedin: { Icon: Linkedin, title: "LinkedIn" },
    twitter: { Icon: Twitter, title: "Twitter" },
    facebook: { Icon: Facebook, title: "Facebook" },
    instagram: { Icon: Instagram, title: "Instagram" },
    github: { Icon: Github, title: "GitHub" },
};

export default function CompanySocialMedia({ socialLinks }) {
    const socialMediaComponents = Object.entries(socialLinks).map(
        ([key, value]) => {
            const config = ICONS[key];
            if (!config) return null;

            return (
                <SocialMediaComponent
                    key={key}
                    href={value}
                    Icon={config.Icon}
                    title={config.title}
                />
            );
        },
    );

    return (
        <div className="card p-6">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="space-y-2">{socialMediaComponents}</div>
        </div>
    );
}
