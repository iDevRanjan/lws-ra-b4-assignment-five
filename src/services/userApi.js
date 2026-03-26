import { axiosInstance } from "./axiosInstance";

export async function getUserProfile() {
    const response = await axiosInstance.get("/api/users/profile");
    return response.data;
}

export async function getJobSeekerApplications(params) {
    const response = await axiosInstance.get(
        `/api/applications/my-applications${params ? `?${params}` : ""}`,
    );
    return response.data;
}

export async function updateJobSeekerAvatar(avatarFormData) {
    const response = await axiosInstance.post(
        "/api/users/profile-picture",
        avatarFormData,
    );
    return response.data;
}

export async function updateJobSeekerResume(resumeFormData) {
    const response = await axiosInstance.post(
        "/api/users/resume",
        resumeFormData,
    );
    return response.data;
}

export async function updateJobSeekerProfile(profileFormData) {
    const response = await axiosInstance.put(
        "/api/users/profile",
        profileFormData,
    );
    return response.data;
}

export async function applyAJob(coverLetterFormData, jobId) {
    const response = await axiosInstance.post(
        `/api/applications/jobs/${jobId}/apply`,
        coverLetterFormData,
    );
    return response.data;
}
