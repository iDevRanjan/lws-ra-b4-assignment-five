import AppRoutes from "./routes/AppRoutes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppRoutes />
            <Toaster position="top-right" />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
