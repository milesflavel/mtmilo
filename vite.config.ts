import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import Sitemap from "vite-plugin-sitemap";
import { visualizer } from "rollup-plugin-visualizer";
import blogIndex from "./public/blog/index.json";

const ReactCompilerConfig = {
  target: "18",
};

const getRoute = (entry) => `/blog/${entry.id}`;
const getLastModified = (entry) => new Date(entry.modified);

const dynamicRoutes = blogIndex.map((entry) => getRoute(entry));
const lastmod = Object.fromEntries(
  blogIndex.map((entry) => [getRoute(entry), getLastModified(entry)]),
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
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
