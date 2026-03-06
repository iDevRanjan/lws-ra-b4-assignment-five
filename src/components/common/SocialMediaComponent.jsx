export function SocialMediaComponent({ href, Icon, title }) {
    return (
        <a
            target="_blank"
            href={href}
            className="hover:bg-accent flex items-center gap-3 rounded-md p-2 transition-colors"
        >
            <Icon className="text-muted-foreground h-5 w-5" />
            <span className="text-sm font-medium">{title}</span>
        </a>
    );
}
