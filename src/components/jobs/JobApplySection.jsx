import { Send } from "lucide-react";
import { getDateDifferenceFromNow } from "../../utils/getDateDifferenceFromNow";

export default function JobApplySection({ jobDetailsData }) {
    return (
        <div className="card p-6 lg:sticky lg:top-24">
            <div className="space-y-4">
                <div className="border-border border-b pb-4 text-center">
                    <p className="text-primary mb-1 text-2xl font-bold">
                        ${jobDetailsData.salaryMin / 1000}k - $
                        {jobDetailsData.salaryMax / 1000}k
                    </p>
                    <p className="text-muted-foreground text-sm">
                        {jobDetailsData.salaryPeriod}
                    </p>
                </div>
                <button className="btn btn-primary w-full text-base">
                    <Send className="mr-2 h-4 w-4" />
                    Apply Now
                </button>
                <div className="border-border space-y-3 border-t pt-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Applicants
                        </span>
                        <span className="font-medium">
                            {jobDetailsData.applicants}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Posted</span>
                        <span className="font-medium">
                            {getDateDifferenceFromNow(jobDetailsData.createdAt)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
