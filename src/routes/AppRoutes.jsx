import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layouts/MainLayout";
import RootFallback from "../components/layout/RootFallback";
import Home from "../pages/public/Home";
import QueryObjectProvider from "../providers/QueryObjectProvider";
import JobDetails from "../pages/public/JobDetails";
import {
    getCompanyBySlugLoader,
    getJobBySlugLoader,
} from "../services/routerLoaders";
import ErrorElement from "../pages/error/ErrorElement";
import CompanyProfile from "../pages/public/CompanyProfile";
import Login from "../pages/auth/Login";
import PublicRoutes from "./PublicRoutes";
import JobSeekerRegister from "../pages/auth/JobSeekerRegister";
import CompanyRegister from "../pages/auth/CompanyRegister";
import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import JobSeekerDashboard from "../pages/jobSeeker/JobSeekerDashboard";

function router(queryClient) {
    return createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            hydrateFallbackElement: <RootFallback />,
            children: [
                {
                    errorElement: <ErrorElement />,
                    children: [
                        {
                            index: true,
                            element: (
                                <QueryObjectProvider>
                                    <Home />
                                </QueryObjectProvider>
                            ),
                        },
                        {
                            path: "jobs/:jobSlug",
                            element: <JobDetails />,
                            loader: (loaderFnArgs) =>
                                getJobBySlugLoader(loaderFnArgs, queryClient),
                        },
                        {
                            path: "companies/:companySlug",
                            element: <CompanyProfile />,
                            loader: (loaderFnArgs) =>
                                getCompanyBySlugLoader(
                                    loaderFnArgs,
                                    queryClient,
                                ),
                        },
                        {
                            element: <PublicRoutes />,
                            children: [
                                {
                                    path: "login",
                                    element: <Login />,
                                },
                                {
                                    path: "jobseeker-register",
                                    element: <JobSeekerRegister />,
                                },
                                {
                                    path: "company-register",
                                    element: <CompanyRegister />,
                                },
                            ],
                        },
                        {
                            element: <PrivateRoute />,
                            children: [
                                {
                                    element: (
                                        <RoleBasedRoute allowedRole="USER" />
                                    ),
                                    children: [
                                        {
                                            path: "jobseeker-dashboard",
                                            element: <JobSeekerDashboard />,
                                        },
                                        {
                                            path: "/jobseeker-profile",
                                            // element: <UserProfile />,
                                        },
                                        {
                                            path: "/edit-user-profile",
                                            // element: <EditUserProfile />,
                                        },
                                        {
                                            path: "jobseeker-applications",
                                            // element: <AppliedJobs />,
                                        },
                                    ],
                                },
                                {
                                    element: (
                                        <RoleBasedRoute allowedRole="COMPANY" />
                                    ),
                                    children: [
                                        {
                                            path: "/company-dashboard",
                                            // element: <CompanyDashboard />,
                                        },
                                        {
                                            path: "/edit-company-profile",
                                            // element: <EditCompanyProfile />,
                                        },
                                        {
                                            path: "/create-job",
                                            // element: <CreateJob />,
                                        },
                                        {
                                            path: "/manage-jobs",
                                            // element: <ManageJobs />,
                                        },
                                        {
                                            path: "/applicants",
                                            // element: <Applicants />,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    path: "*",
                    element: <ErrorElement />,
                },
            ],
        },
    ]);
}

// যখন আপনি `http://localhost:5173/not-found` ইউআরএলটি হিট করেন, তখন রাউটার প্রথমে মূল পাথ `/`-এর সাথে মিল খুঁজে পায় এবং এর `children` লিস্টে প্রবেশ করে। কিন্তু ভেতরে গিয়ে সে দেখে মাত্র দুটি নির্দিষ্ট রাস্তা আছে: একটি `index` (অর্থাৎ শুধু `/`) এবং অন্যটি `/jobs/:jobSlug`। যেহেতু `/not-found` ইউআরএলটি এই দুটির কোনোটির সাথেই মিলছে না, তাই রাউটার ধরে নেয় যে এই চিলড্রেন গ্রুপের ভেতর তার প্রয়োজনীয় কিছু নেই এবং সে গ্রুপটি থেকে বের হয়ে আসে।

// আপনার কোডে `errorElement` দেওয়া ছিল একটি নিজস্ব `path`-বিহীন রুটের (Pathless Route) ভেতরে। `errorElement` তখনই কার্যকর হয়, যখন রাউটার কোনো নির্দিষ্ট পাথের সাথে ইউআরএল-এর মিল খুঁজে পেয়ে সেই রুটে প্রবেশ করে এবং সেখানে `loader`, `action` বা কম্পোনেন্ট রেন্ডারিংয়ের সময় কোনো এরর ঘটে। কিন্তু যখন ইউআরএল-এর সাথে কোনো চাইল্ড রুটের মিল পাওয়া যায় না, তখন পুরো রুট-শাখাটিই অকার্যকর (invalid) হিসেবে বিবেচিত হয়। এটি কোনো রানটাইম এরর নয়, বরং একটি "কোনো রুটের সাথে মিল পাওয়া যায়নি (No Route Match)" অবস্থা। এই পরিস্থিতিতে রাউটার সেই pathless রুটের ভেতরে প্রবেশ করে না, ফলে সেখানে থাকা `errorElement: <ErrorElement />`-টিও ব্যবহার করতে পারে না। ফলস্বরূপ, সে কোনো এরর হ্যান্ডেলার না পেয়ে একদম রুট লেভেলে ফিরে যায়। যদি আপনার একদম রুট লেভেলে কোনো `errorElement` সেট করা থাকে, তবে রাউটার সেটিকে রেন্ডার করে (পুরো পেজ জুড়ে), আর যদি সেখানেও কিছু না থাকে, তবে সে ডিফল্ট "Hey developer 👋" মেসেজটি দেখায়।

// এই সমস্যাটি সমাধানের জন্য একটি **Catch-all Route** বা `path: "*"` ব্যবহার করা হয়, যা রাউটারকে নির্দেশ দেয় যে যদি উপরের কোনো নির্দিষ্ট পাথের সাথে ইউআরএল-এর মিল না পাওয়া যায়, তবে সে যেন অবশ্যই এই রুটে প্রবেশ করে। যখন আপনি আপনার নেস্টেড চিলড্রেন গ্রুপের একদম শেষে এই ওয়াইল্ডকার্ড (`*`) পাথটি যোগ করেন, তখন যেকোনো ভুল ইউআরএল-এর জন্য রাউটার ওই গ্রুপের ভেতরে ঢুকতে বাধ্য হয় এবং যেহেতু সে এখন গ্রুপের ভেতরে আছে, তাই সে আপনার দেওয়া নেস্টেড `errorElement`-টিকে খুঁজে পায় এবং সেটিকে `MainLayout`-এর ভেতর (হেডার ও ফুটারের মাঝখানে) সুন্দরভাবে রেন্ডার করে।

// আপনি যখন `localhost:5173/jobs/not-found` ইউআরএলটি হিট করেছেন, তখন রাউটার দেখেছে যে এটি আপনার ডিফাইন করা `jobs/:jobSlug` পাথের সাথে হুবহু মিলে যাচ্ছে (যেখানে `not-found` একটি প্যারামিটার), ফলে রাউটার ওই রুটের ভেতরে প্রবেশ করে এবং সংশ্লিষ্ট `loader` ফাংশনটিকে কল করে; কিন্তু লোডার যখন এপিআই থেকে ডেটা না পেয়ে কোনো এরর `throw` করেছে, তখন রাউটার সাথে সাথে সেই এররটি হ্যান্ডেল করার জন্য আপনার দেওয়া নেস্টেড `errorElement` বা `<ErrorElement />` কম্পোনেন্টটিকে `MainLayout`-এর ভেতর রেন্ডার করেছে।

// **সহজ সারকথা:** রাউটার কোনো নেস্টেড গ্রুপের ভেতরকার `errorElement` তখনই ব্যবহার করতে পারে, যখন সে ওই গ্রুপের কোনো একটি রাস্তার (Path) সাথে ইউআরএল-এর মিল খুঁজে পায়। যেহেতু `/not-found` ইউআরএলটির জন্য আপনার রাউটে কোনো মিল ছিল না, তাই রাউটার আপনার দেওয়া 'সিকিউরিটি গার্ড' বা Nested Error Boundary-কে না দেখেই পাশ কাটিয়ে চলে গেছে। মূলত, **`errorElement`** তখনই সক্রিয় হয় যখন রাউটার একটি সঠিক পাথের মিল খুঁজে পাওয়ার পর ওই পাথে প্রবেশ করে এবং সেখানে কোনো টেকনিক্যাল দুর্ঘটনা ঘটে; যেমন—যদি ওই পাথের `loader` ফাংশনটি ডেটা ফেচ করতে গিয়ে কোনো এরর `throw` করে অথবা কম্পোনেন্ট রেন্ডার হওয়ার সময় জাভাস্ক্রিপ্ট লেভেলে ক্রাশ করে। অর্থাৎ, ইউআরএল সঠিক হওয়া সত্ত্বেও যদি কোড বা ডেটা লেভেলে কোনো সমস্যা হয়, তবেই রাউটার নির্দিষ্ট সীমানার ভেতর আপনার দেওয়া `errorElement`-টি প্রদর্শন করে; ঠিক এই কারণেই যখন `localhost:5173/jobs/not-found` পাথে গিয়ে আপনার `loader` ফাংশনটি এরর থ্রো করেছিল, তখন সেটি আপনার নির্দিষ্ট করা `errorElement`-টিকে রান করতে পেরেছিল।

// প্রফেশনাল অ্যাপে আমরা `path: "*"` এবং `errorElement` একসাথেই ব্যবহার করি।
// - `path: "*"` নিশ্চিত করে যে ভুল ইউআরএল দিলেও লেআউটের ভেতরেই থাকবে।
// - `errorElement` নিশ্চিত করে যে ডাটা লোড না হলে বা কোড ভুল থাকলেও লেআউট ভাঙবে না।

export default function AppRoutes({ queryClient }) {
    return <RouterProvider router={router(queryClient)} />;
}
