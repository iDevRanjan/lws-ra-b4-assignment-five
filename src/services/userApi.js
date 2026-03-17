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
