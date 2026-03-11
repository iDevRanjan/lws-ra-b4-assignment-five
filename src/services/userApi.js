export async function getUserProfile(axiosInstance) {
    console.log(axiosInstance.interceptors.request);
    console.log(axiosInstance.interceptors.response);

    const response = await axiosInstance.get("/api/users/profile");
    return response.data;
}

export async function getJobSeekerApplications(axiosInstance) {
    const response = await axiosInstance.get(
        "/api/applications/my-applications",
    );
    return response.data;
}
