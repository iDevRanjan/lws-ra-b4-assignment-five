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
