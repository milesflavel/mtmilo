import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import Sitemap from "vite-plugin-sitemap";
import { visualizer } from "rollup-plugin-visualizer";
import BlogIndex from "./public/blog/index.json";

const dynamicRoutes = [
  "/",
  ...BlogIndex.map((article) => `/blog/${article.id}`),
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    Sitemap({
      dynamicRoutes: dynamicRoutes,
      hostname: "https://www.mtmilo.net/",
    }),
    visualizer(), // Must be last entry
  ],
  assetsInclude: ["**/*.svg"],
});
