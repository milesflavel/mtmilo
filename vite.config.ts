import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import Sitemap from "vite-plugin-sitemap";
import { visualizer } from "rollup-plugin-visualizer";
import blogIndex from "./public/blog/index.json";
import fs from "fs";

const getRoute = (entry) => `/blog/${entry.id}`;
const getLastModified = (entry) =>
  fs.statSync(`./public/blog/${entry.id}.md`).mtime;

const dynamicRoutes = blogIndex.map((entry) => getRoute(entry));
const lastmod = Object.fromEntries(
  blogIndex.map((entry) => [getRoute(entry), getLastModified(entry)]),
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    Sitemap({
      dynamicRoutes: dynamicRoutes,
      hostname: "https://www.mtmilo.net/",
      robots: [{ userAgent: "*", disallow: ["/interactive"] }],
      lastmod: lastmod,
    }),
    visualizer(), // Must be last entry
  ],
  assetsInclude: ["**/*.svg"],
});
