import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/constants";
import {
    getAllJobs,
    getJobBySlug,
    getRecommendedJobs,
    getSimilarJobs,
} from "./jobApi";
import {
    getApplicantProfile,
    getCompanyApplicants,
    getCompanyBySlug,
    getCompanyDashboardStats,
    getCompanyOpenPositions,
    getCompanyOpenPositionsForOwn,
    getCompanyProfile,
} from "./companyApi";
import { getJobSeekerApplications, getUserProfile } from "./userApi";

export function getAllJobsQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.allJobs, params],
        queryFn: ({ pageParam }) => getAllJobs(pageParam, params),
        initialPageParam: 1,
        placeholderData: keepPreviousData,

        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data.length === 0) {
                return undefined;
            }

            return allPages.length + 1;
        },
    });
}

// আমি যখন `useInfiniteQuery` এবং Load More ফিচারের মাধ্যমে কোনো জবের 2 নম্বর পেজের ডাটা দেখছি এবং ঠিক সেই মুহূর্তে নতুন কোনো সার্চ বা ফিল্টারের প্যারামিটার (`params`) পরিবর্তন করছি, তখন কেন এপিআই রিকোয়েস্টটি আবার 1 নম্বর পেজ থেকে শুরু হচ্ছে এবং কেন সেটি আগের 2 নম্বর পেজ থেকে কন্টিনিউ না করে রিসেট হয়ে যাচ্ছে?

// TanStack Query-তে যখন আপনি `params` পরিবর্তন করেন, তখন আপনার নির্ধারিত **`queryKey`**-ও পরিবর্তিত হয়, আর React Query-র লজিক অনুযায়ী প্রতিটি নতুন বা পরিবর্তিত `queryKey` মানেই হলো একটি সম্পূর্ণ নতুন কুয়েরি যা সবসময় তার **`initialPageParam`** (আপনার কোডে যা 1) থেকে ডাটা ফেচ করা শুরু করে। আপনি যখন Load More করে 2, 3, 4...etc নম্বর পেজে গিয়েছিলেন, সেটি ছিল আপনার আগের নির্দিষ্ট প্যারামিটারের (`params`) অধীনে; কিন্তু নতুন কোনো ফিল্টার বা সার্চ করার সাথে সাথে প্যারামিটার (`params`) বদলে যাওয়ায় React Query পূর্বের সব ডাটা সরিয়ে দেয় এবং নতুন ফিল্টার করা ফলাফলগুলো আবার একদম শুরু (Page 1) থেকে সংগ্রহ করে, যাতে ইউজার সবসময় সঠিক এবং প্রাসঙ্গিক রেজাল্টগুলো প্রথম পেজ থেকেই দেখতে পায়।

// আমি যখন Load More ব্যবহার করে কোনো জবের 2 নম্বর পেজ পর্যন্ত ডাটা লোড করেছি এবং এরপর নতুন কোনো ফিল্টার বা সার্চ করার মাধ্যমে অন্য ডাটা সেট দেখেছি, পরবর্তীতে সেই ফিল্টার বা সার্চটি সরিয়ে দিয়ে যখন আবার আগের অবস্থায় ফিরে এলাম, তখন রিঅ্যাক্ট কুয়েরি কেন আমার আগে লোড করা 1 নম্বর এবং 2 নম্বর—উভয় পেজের জন্যই আলাদাভাবে ব্যাকগ্রাউন্ডে ডাটা ফেচ করছে এবং এই প্রক্রিয়াটি আসলে কীভাবে কাজ করছে?

// এটি মূলত React Query-এর ডাটা কনসিস্টেন্সি বজায় রাখার একটি প্রক্রিয়া। যখন কোনো নির্দিষ্ট `queryKey` এবং `params`-এর অধীনে একাধিক পেজ লোড করা হয়, তখন React Query অভ্যন্তরীণভাবে তার `data` অবজেক্টের মধ্যে `pageParams` অ্যারেতে (যেমন: `[1, 2]`) আপনার ফেচ করা সব পেজ নম্বরগুলো স্টোর করে রাখে। পরবর্তীতে অন্য কোনো ফিল্টার থেকে পুনরায় সেই একই কুয়েরি প্যারামিটারে (`params`) ফিরে এলে ক্যাশ থেকে সেই `data` তাৎক্ষণিকভাবে দেখানো হয়। এরপর যদি ডাটা স্টেল হয় (ডিফল্টভাবে `staleTime` থাকে 0), তবে React Query সেই `pageParams` অ্যারে অনুযায়ী একটি ইন্টারনাল লুপ চালিয়ে পূর্বের প্রতিটি পেজের জন্য পুনরায় ধারাবাহিক (sequential) নেটওয়ার্ক রিকোয়েস্ট পাঠায়। এর ফলে সম্পূর্ণ ডাটাসেট সর্বশেষ ডাটাসহ আপডেট হয়ে যায় এবং ইউজার তার ছেড়ে আসা আগের লিস্টটি কোনো বাধা ছাড়াই পুনরায় দেখতে পায়, যা একটি উন্নত UX নিশ্চিত করে।

export function getJobBySlugQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.jobBySlug, params],
        queryFn: () => getJobBySlug(params),
    });
}

export function getSimilarJobsQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.similarJobs, params],
        queryFn: () => getSimilarJobs(params),

        // Learn more about:
        /**
         * https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries
         * https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries
         */
        enabled: false,
    });
}

export function getCompanyBySlugQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.companyBySlug, params],
        queryFn: () => getCompanyBySlug(params),
    });
}

export function getCompanyOpenPositionsQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.companyOpenPositions, params],
        queryFn: () => getCompanyOpenPositions(params),
    });
}

export function getClientProfileQueryOption(authData) {
    return queryOptions({
        queryKey: [QUERY_KEYS.clientProfile, authData.role],
        queryFn: () => {
            if (authData.role === "USER") {
                return getUserProfile();
            }
            if (authData.role === "COMPANY") {
                return getCompanyProfile();
            }

            throw new Error("Invalid role");
        },
        enabled: authData.isLoggedin,
        retry: false,
    });
}

export function getJobSeekerApplicationsQueryOption(
    isLoggedinJobSeeker,
    params,
) {
    return queryOptions({
        queryKey: [QUERY_KEYS.jobSeekerApplications, params],
        queryFn: () => getJobSeekerApplications(params),
        enabled: isLoggedinJobSeeker,
        retry: false,
    });
}

export function getRecommendedJobsQueryOption() {
    return queryOptions({
        queryKey: [QUERY_KEYS.recommendedJobs],
        queryFn: getRecommendedJobs,
    });
}

export function getCompanyDashboardStatsQueryOption() {
    return queryOptions({
        queryKey: [QUERY_KEYS.companyDashboardStats],
        queryFn: getCompanyDashboardStats,
    });
}

export function getCompanyOpenPositionsForOwnQueryOption(pageParam, params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.companyOpenPositionsForOwn, pageParam, params],
        queryFn: () => getCompanyOpenPositionsForOwn(pageParam, params),
    });
}

export function getCompanyApplicantsQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.companyApplicants, params],
        queryFn: ({ pageParam }) => getCompanyApplicants(pageParam, params),
        initialPageParam: 1,
        placeholderData: keepPreviousData,

        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data.length === 0) {
                return undefined;
            }

            return allPages.length + 1;
        },
    });
}

export function getApplicantProfileQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.applicantProfile, params],
        queryFn: () => getApplicantProfile(params),
    });
}
