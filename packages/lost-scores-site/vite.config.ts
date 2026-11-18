import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), viteCompression()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5174,
    proxy: {
      "/api": {
        target: process.env.LOST_SCORES_API ?? "http://127.0.0.1:8000",
        changeOrigin: true,
      },
      "/dl": {
        target: process.env.LOST_SCORES_API ?? "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    target: "es2020",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
