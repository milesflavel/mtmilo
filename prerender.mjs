import puppeteer from "puppeteer";
import blogIndex from "./public/blog/index.json" assert { type: "json" };
import fs from "fs";

const STARTUP_DELAY = 15000;
const HEADLESS = true;
const BASE_URL = "http://localhost:4173";
const OUTPUT_DIR = "./dist";
const staticRoutes = ["", "/blog", "/interactive"];
const dynamicRoutes = blogIndex.map((entry) => `/blog/${entry.id}`);

// const delay = async (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

// console.log(`Waiting ${STARTUP_DELAY / 1000}s to allow webserver to begin`);
// await delay(STARTUP_DELAY);

console.log("Starting browser");
const browser = await puppeteer.launch({ headless: HEADLESS });

for (const route of [...staticRoutes, ...dynamicRoutes]) {
  const pageUrl = `${BASE_URL}${route}`;
  const fileDir = `${OUTPUT_DIR}${route}`;
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
}

await browser.close();
