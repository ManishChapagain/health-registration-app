import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  worker: {
    format: "es",
  },
  optimizeDeps: {
    exclude: ["@electric-sql/pglite"],
  },
  plugins: [react()],
});
