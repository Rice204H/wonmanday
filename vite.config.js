import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/wonmanday/",
  build: { assetsInlineLimit: 4096 },
});
