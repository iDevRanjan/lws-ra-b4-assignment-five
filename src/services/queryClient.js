import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 1 * 60 * 1000,
            // gcTime: 2.5 * 60 * 1000,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        },
    },
});
