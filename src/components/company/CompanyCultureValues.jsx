import { Heart, Lightbulb, Target, Users } from "lucide-react";

export default function CompanyCultureValues() {
    return (
        <div className="card p-6">
            <h2 className="mb-4 text-xl font-semibold">Our Values</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex gap-3">
                    <div className="shrink-0">
                        <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded-lg">
                            <Lightbulb className="text-primary h-5 w-5" />
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-1 font-semibold">Innovation</h3>
                        <p className="text-muted-foreground text-sm">
                            We encourage creative thinking and embrace new ideas
                            to solve problems.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="shrink-0">
                        <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded-lg">
                            <Users className="text-primary h-5 w-5" />
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-1 font-semibold">Collaboration</h3>
                        <p className="text-muted-foreground text-sm">
                            Teamwork and open communication are at the heart of
                            everything we do.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="shrink-0">
                        <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded-lg">
                            <Target className="text-primary h-5 w-5" />
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-1 font-semibold">Excellence</h3>
                        <p className="text-muted-foreground text-sm">
                            We strive for the highest quality in our products
                            and services.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="shrink-0">
                        <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded-lg">
                            <Heart className="text-primary h-5 w-5" />
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-1 font-semibold">Integrity</h3>
                        <p className="text-muted-foreground text-sm">
                            Honesty and transparency guide our decisions and
                            actions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
