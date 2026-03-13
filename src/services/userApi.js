import { axiosInstance } from "./axiosInstance";

export async function getUserProfile() {
    const response = await axiosInstance.get("/api/users/profile");
    return response.data;
}

export async function getJobSeekerApplications() {
    const response = await axiosInstance.get(
        "/api/applications/my-applications",
    );
    return response.data;
}
