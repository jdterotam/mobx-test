import { defineConfig } from "vite";
import reactSupport from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactSupport({
      babel: {
        parserOpts: {
          plugins: ["classProperties", "@babel/plugin-proposal-decorators"],
        },
      },
    }),
  ],
  server: {
    port: 5173,
  },
  build: {
    cssMinify: true,
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      toplevel: true,
      compress: true,
    },
  },
});
