export default function Field({ label, htmlFor, children, error }) {
    return (
        <div className="space-y-2">
            <label htmlFor={htmlFor} className="label">
                {label}:
            </label>
            <div className="relative mt-1">{children}</div>
            {error && <p className="text-red-600">{error.message}</p>}
        </div>
    );
}
