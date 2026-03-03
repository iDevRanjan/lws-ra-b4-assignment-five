import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/public/Home";
import QueryObjectProvider from "../providers/QueryObjectProvider";
import JobDetails from "../components/jobs/JobDetails";
import { getJobBySlugLoader } from "../services/routerLoaders";
import NotFound from "../pages/error/NotFound";

function RootFallback() {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading application...</p>
        </div>
    );
}

function router(queryClient) {
    return createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <NotFound />,
            hydrateFallbackElement: <RootFallback />,
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
                    path: "/job-details/:jobSlug",
                    element: <JobDetails />,
                    loader: (loaderFnArgs) =>
                        getJobBySlugLoader(loaderFnArgs, queryClient),
                },
                // { path: "/company-profile/:id", element: <CompanyProfile /> },
                // {
                //     element: <PublicRoute />,
                //     children: [
                //         { path: "/login", element: <Login /> },
                //         { path: "/user-register", element: <Register /> },
                //         { path: "/company-register", element: <CompanyRegister /> },
                //     ],
                // },
                // {
                //     element: <RoleBasedRoute allowedRole="USER" />,
                //     children: [
                //         { path: "/user-dashboard", element: <UserDashboard /> },
                //         { path: "/user-profile", element: <UserProfile /> },
                //         {
                //             path: "/edit-user-profile",
                //             element: <EditUserProfile />,
                //         },
                //         { path: "/applied-jobs", element: <AppliedJobs /> },
                //     ],
                // },
                // {
                //     element: <RoleBasedRoute allowedRole="COMPANY" />,
                //     children: [
                //         {
                //             path: "/company-dashboard",
                //             element: <CompanyDashboard />,
                //         },
                //         {
                //             path: "/edit-company-profile",
                //             element: <EditCompanyProfile />,
                //         },
                //         { path: "/create-job", element: <CreateJob /> },
                //         { path: "/manage-jobs", element: <ManageJobs /> },
                //         { path: "/applicants", element: <Applicants /> },
                //     ],
                // },
            ],
        },
    ]);
}

export default function AppRoutes({ queryClient }) {
    return <RouterProvider router={router(queryClient)} />;
}
