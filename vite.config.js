import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxImportSource: "@welldone-software/why-did-you-render",
        }),
        tailwindcss(),
    ],
});
