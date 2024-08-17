import puppeteer from "puppeteer";
import blogIndex from "./public/blog/index.json" assert { type: "json" };
import fs from "fs";
import { build, preview } from "vite";

// Config
const staticRoutes = ["", "blog"];
const dynamicRoutes = blogIndex.map((entry) => `blog/${entry.id}`);

// Build
console.log("Building app");
await build();

// Startup
console.log("Starting preview server");
const previewServer = await preview();
const baseUrl = previewServer.resolvedUrls.local[0];
const outputDir = previewServer.config.build.outDir;

console.log("Starting browser");
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox"],
});

// Rendering
for (const route of [...staticRoutes, ...dynamicRoutes]) {
  const pageUrl = `${baseUrl}${route}`;
  const fileDir = `${outputDir}/${route}`;
  const filePath = `${fileDir}/index.html`;

  console.log(`Rendering page ${pageUrl}`);
  const page = await browser.newPage();
  await page.goto(pageUrl, { waitUntil: "networkidle0" });
  const pageHtml = await page.content();

  if (!fs.existsSync(fileDir)) {
    console.log(`Creating directory ${fileDir}`);
    fs.mkdirSync(fileDir, { recursive: true });
  }

  console.log(`Writing file ${filePath}`);
  fs.writeFile(filePath, pageHtml, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Done writing file ${filePath}`);
  });

  await page.close();
}

// Teardown
console.log("Closing browser");
await browser.close();

console.log("Closing preview server");
previewServer.httpServer.close();
