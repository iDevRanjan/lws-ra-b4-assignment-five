import { HardHat } from "lucide-react";

export default function CompanySettings() {
    return (
        <main className="animate-in fade-in container mx-auto flex flex-col items-center justify-center px-4 py-8 text-center duration-500">
            <div className="mb-6 rounded-2xl border border-amber-100 bg-amber-50 p-6 shadow-sm">
                <HardHat className="size-15 animate-bounce text-amber-600" />
            </div>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900">
                Something exciting is in the works!
            </h2>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-500">
                This feature is currently under active development. We're
                building the best experience for you, and it will be available
                very soon. Stay tuned!
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold tracking-wider text-slate-700 uppercase">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500"></span>
                Development in Progress
            </div>
        </main>
    );
}
