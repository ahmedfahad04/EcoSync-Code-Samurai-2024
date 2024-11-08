import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"), // source files are in the 'src' directory
        },
    },
    optimizeDeps: {
        exclude: ["js-big-decimal"],
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: true, // Here
        strictPort: true,
        port: 8000,
    },
});
