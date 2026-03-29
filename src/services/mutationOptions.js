import { mutationOptions } from "@tanstack/react-query";
import { applicationLogin, clientRegister } from "./authApi";
import {
    applyAJob,
    updateJobSeekerAvatar,
    updateJobSeekerProfile,
    updateJobSeekerResume,
    withdrawApplication,
} from "./userApi";
import { queryClient } from "./queryClient";
import { QUERY_KEYS } from "../utils/constants";
import { applicationStatusUpdate } from "./companyApi";

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

export function applyAJobMutationOption(jobId) {
    return mutationOptions({
        mutationFn: (coverLetterFormData) =>
            applyAJob(coverLetterFormData, jobId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.jobSeekerApplications],
            });
        },
    });
}

export function withdrawApplicationMutationOption(applicationId) {
    return mutationOptions({
        mutationFn: () => withdrawApplication(applicationId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.jobSeekerApplications],
            });
        },
    });
}

export function applicationStatusUpdateMutationOption(applicationId) {
    return mutationOptions({
        mutationFn: (payload) =>
            applicationStatusUpdate(applicationId, payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.companyApplicants],
            });
        },
    });
}
