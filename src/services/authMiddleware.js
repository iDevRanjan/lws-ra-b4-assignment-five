import { store } from "../store";
import { queryClient } from "./queryClient";
import { getClientProfileQueryOption } from "./queryOptions";
import { authContext } from "../context";

export async function rootAuthMiddleware({ context }, next) {
    const authData = store.getState().authData;

    let authMiddlewareData = { isLoggedin: false, email: null };

    if (authData.isLoggedin) {
        try {
            const response = await queryClient.ensureQueryData(
                getClientProfileQueryOption(authData),
            );

            if (response.success) {
                authMiddlewareData = {
                    isLoggedin: true,
                    email: response.data.email,
                };
            }
        } catch (error) {
            console.error("Middleware Auth Error:", error.message);
        }
    }

    context.set(authContext, authMiddlewareData);

    return next();
}
