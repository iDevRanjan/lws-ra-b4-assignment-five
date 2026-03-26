export function applicationJobChecking(applicationJobs, jobId) {
    if (!applicationJobs || !jobId) return;

    const application = applicationJobs.find(
        (applicationJob) => jobId === applicationJob.jobId,
    );

    return {
        exist: Boolean(application),
        status: application?.status,
        applicationId: application?.id,
    };
}
