export function applicationJobChecking(applicationJobs, jobId) {
    if (!applicationJobs || !jobId) return;

    const isApplicationJobAvailable = applicationJobs.some(
        (applicationJob) => jobId === applicationJob.jobId,
    );

    return isApplicationJobAvailable;
}
