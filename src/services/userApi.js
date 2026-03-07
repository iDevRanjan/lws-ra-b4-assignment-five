import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getUserProfile(authToken) {
    const response = await axios.get(`${BASE_URL}/api/users/profile`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data;
}
