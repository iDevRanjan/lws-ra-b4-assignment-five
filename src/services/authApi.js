import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function applicationLogin(loginFormData) {
    const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        loginFormData,
    );
    return response.data;
}

export async function clientRegister(registerFormData) {
    const response = await axios.post(
        `${BASE_URL}/api/auth/register`,
        registerFormData,
    );
    return response.data;
}
