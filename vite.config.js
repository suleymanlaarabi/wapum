import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
import wasmPack from "vite-plugin-wasm-pack";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasmPack("./wapum-rust")],
  // send .com or all all all url to index.html
  server: {
    fs: {
      strict: false,
    },
    host: "0.0.0.0",
  },
});
