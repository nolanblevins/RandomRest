import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The Vercel CLI will handle proxying in development
    // based on the vercel.json rewrites.
  },
});
