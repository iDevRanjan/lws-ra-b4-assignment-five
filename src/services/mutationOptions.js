import { mutationOptions } from "@tanstack/react-query";
import { applicationLogin } from "./authApi";

export function applicationLoginMutationOption(login) {
    return mutationOptions({
        mutationFn: (loginFormData) => applicationLogin(loginFormData),
        onSuccess: (data) => {
            const authLocalStorageData = {
                isLoggedin: data.success,
                token: data.token,
                loggedinClientId: data.data.id,
                role: data.data.role,
            };
            login(authLocalStorageData);
        },
    });
}
