import { mutationOptions } from "@tanstack/react-query";
import { applicationLogin, clientRegister } from "./authApi";
import {
    updateJobSeekerAvatar,
    updateJobSeekerProfile,
    updateJobSeekerResume,
} from "./userApi";

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

export function jobSeekerAvatarUpdateMutationOption() {
    return mutationOptions({
        mutationFn: (avatarFormData) => updateJobSeekerAvatar(avatarFormData),
    });
}

export function jobSeekerResumeUpdateMutationOption() {
    return mutationOptions({
        mutationFn: (resumeFormData) => updateJobSeekerResume(resumeFormData),
    });
}

export function jobSeekerProfileUpdateMutationOption() {
    return mutationOptions({
        mutationFn: (profileFormData) =>
            updateJobSeekerProfile(profileFormData),
    });
}
