import axios from "axios";

export async function getAllJobs(pageParam, params) {
    const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/jobs?page=${pageParam}${params ? `&${params}` : ""}`,
    );
    return response.data;
}

export async function getJobBySlug(jobSlug) {
    const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/jobs/${jobSlug}`,
    );
    return response.data;
}
