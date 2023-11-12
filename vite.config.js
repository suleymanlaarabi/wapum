import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // send .com or all all all url to index.html
  server: {
    fs: {
      strict: false,
    },
    host: "0.0.0.0",
  },
});
