import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAllJobs(pageParam, params) {
    const response = await axios.get(
        `${BASE_URL}/api/jobs?page=${pageParam}${params ? `&${params}` : ""}`,
    );
    return response.data;
}

export async function getJobBySlug(jobSlug) {
    const response = await axios.get(`${BASE_URL}/api/jobs/${jobSlug}`);
    return response.data;
}

export async function getSimilarJobs(jobId) {
    const response = await axios.get(`${BASE_URL}/api/jobs/${jobId}/similar`);
    return response.data;
}
