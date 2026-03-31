import axios from "axios";
import { axiosInstance } from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCompanyBySlug(companySlug) {
    const response = await axios.get(
        `${BASE_URL}/api/companies/${companySlug}`,
    );
    return response.data;
}

export async function getCompanyOpenPositions(openPositionsSlug) {
    const response = await axios.get(
        `${BASE_URL}/api/companies/${openPositionsSlug}/jobs`,
    );
    return response.data;
}

export async function getCompanyProfile() {
    const response = await axiosInstance.get("/api/companies/profile");
    return response.data;
}

export async function getCompanyDashboardStats() {
    const response = await axiosInstance.get("/api/companies/dashboard/stats");
    return response.data;
}

export async function getCompanyOpenPositionsForOwn(pageParam, params) {
    const response = await axiosInstance.get(
        `/api/companies/jobs?page=${pageParam}&limit=5${params ? `&${params}` : ""}`,
    );
    return response.data;
}

export async function getCompanyApplicants(params) {
    const response = await axiosInstance.get(
        `/api/companies/applicants${params ? `?${params}` : ""}`,
    );
    return response.data;
}

export async function getApplicantProfile(applicantId) {
    const response = await axiosInstance.get(`/api/users/${applicantId}`);
    return response.data;
}

export async function applicationStatusUpdate(applicationId, payload) {
    const response = await axiosInstance.patch(
        `/api/applications/${applicationId}/status`,
        payload,
    );
    return response.data;
}

export async function updateCompanyJobStatus(applicationId, payload) {
    const response = await axiosInstance.put(
        `/api/jobs/${applicationId}`,
        payload,
    );
    return response.data;
}

export async function deleteCompanyJob(applicationId) {
    const response = await axiosInstance.delete(`/api/jobs/${applicationId}`);
    return response.data;
}
