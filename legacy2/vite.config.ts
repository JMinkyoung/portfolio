import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const base = process.env.GITHUB_PAGES_BASE || "/portfolio/";

export default defineConfig({
  plugins: [react()],
  base,
});
