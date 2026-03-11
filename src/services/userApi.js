// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getUserProfile(axiosInstance) {
    const response = await axiosInstance.get("/api/users/profile");
    return response.data;
}
