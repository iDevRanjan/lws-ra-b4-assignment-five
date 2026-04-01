export default function FilterSection({ title, children }) {
    return (
        <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium">{title}</h3>
            <div className="space-y-2">{children}</div>
        </div>
    );
}
