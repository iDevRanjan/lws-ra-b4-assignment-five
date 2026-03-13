import { mutationOptions } from "@tanstack/react-query";
import { applicationLogin, clientRegister } from "./authApi";

export function applicationLoginMutationOption() {
    return mutationOptions({
        mutationFn: (loginFormData) => applicationLogin(loginFormData),
    });
}

export function clientRegisterMutationOption() {
    return mutationOptions({
        mutationFn: (registerFormData) => clientRegister(registerFormData),
    });
}
