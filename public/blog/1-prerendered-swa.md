# SSG in _my_ SPA? It's more likely than you think.

## Introduction (or how I got myself into this situation)

There's an old saying that goes something like this: "If your only tool is React, then every problem looks like a nail."
It's not fair to say that's my only tool, as I'm proficient with several client and server-side frontend frameworks, but React is certainly the one I've felt the most comfortable with.
My penchant for React SPAs is a double-edge sword though, with its main feature being a major drawback: Client-Side Rendering (CSR).

With the HTML being generated in Javascript as the browser loads the page, it means that the initial page load only contains the empty shell of a webpage, with functionally no content. This presents several major issues, including:

- Pages are initially blank on slow connections
- Search engines can't see any content to generate previews
- Page titles, descriptions and thumbnails won't be shown when sharing links in messaging apps

One solution is to migrate & rewrite the site in a framework that supports Server-Side Rendering (SSR). For a small site, like this one, that's probably one of the better options. But migrations and rewrites aren't always possible, which leads us searching for other options.

Enter Server-Side Generation (SSG).

## Server-Side Generation

SSG, also known as Prerendering, is the process of running the client code for your site ahead of time and saving a copy of the _generated_ HTML.

Once you have static HTML, you serve it directly as your site and, optionally, rehydrate it with your client code to make it behave with all the interactivity you built it for.

## Basic Implementation

The simplest approach I've come up with is to run a headless browser when deploying the SPA, with a list of all the pages that need to be rendered.

Depending on your host configuration, you will likely need to configure the routing so that users are served the prerendered pages instead of your index.html. Luckily for me, at the time of writing I'm running the site as an Azure Static Web App, which has some default routing rules to simplify the process. [I will explain this in more detail below](#the-part-about-swa).

### Building Blocks

My implementation has 4 main elements.

- #### **Local web server**

  My build system is [Vite](), so I'm just using the web server built into that.

- #### **Headless browser**

  I use [Puppeteer](https://pptr.dev/) because it's relatively simple to set up and has an easy to use API.

- #### **Prerender script**

  This runs up a local web server, instructs the headless browser to navigate to each of the specified pages and saves the resulting HTML to an output directory.

- #### **List of routes**

  I use my blog post index json and just append a few additional static routes as part of the prerender script. Depending on the complexity of your app, you may want to do this programatically.

Please note that the exact technologies I've chosen can probably be swapped out for any equivalent depending on your needs, and what's available when you're reading this.

## Code

At the time of writing, the code for my prerender script [can be found here](https://github.com/milesflavel/mtmilo/blob/765df41fc5ebce5e91db9f1e21ca3273a45072c3/prerender.mjs).

### Breakdown

1. We want to configure the routes that need to be rendered. In my case, I have some static routes that will always be available, and some dynamic routes which will need to be determined from the blog index. You could potentially call a database for this but be mindful of complexity of your SSG vs rewriting in a framework with SSR.

   ```mjs
   // Config
   const staticRoutes = ["", "blog"];
   const dynamicRoutes = blogIndex.map((entry) => `blog/${entry.id}`);
   ```

2. I found it easiest to programatically build the application within the prerender script. In my case, this is calling Vite's build function, which uses the existing Vite config file and respects any plugins I've got configured.

   ```mjs
   // Build
   console.log("Building app");
   await build();
   ```

3. Now we start up the local web server using Vite's preview function. This hosts the application code we built in the previous step. With the server instance created, we will grab references to the base URL and output directory.

   ```mjs
   // Startup
   console.log("Starting preview server");
   const previewServer = await preview();
   const baseUrl = previewServer.resolvedUrls.local[0];
   const outputDir = previewServer.config.build.outDir;
   ```

4. We also launch the headless browser instance, which will be used to access the local web server.

   ```mjs
   console.log("Starting browser");
   const browser = await puppeteer.launch({
     headless: true,
     args: ["--no-sandbox"],
   });
   ```

5. Now we will iterate over all the routes. For each route we determine the page URL, the output directory, and the output file path.

   ```mjs
   // Rendering
   for (const route of [...staticRoutes, ...dynamicRoutes]) {
     const pageUrl = `${baseUrl}${route}`;
     const fileDir = `${outputDir}/${route}`;
     const filePath = `${fileDir}/index.html`;
   ```

6. The browser navigates to the page URL, waits for it to settle into an idle state, and then stores the rendered HTML into a variable.

   ```mjs
   console.log(`Rendering page ${pageUrl}`);
   const page = await browser.newPage();
   await page.goto(pageUrl, { waitUntil: "networkidle0" });
   const pageHtml = await page.content();
   ```

7. We verify that the output directory exists, and create the directory if it's missing. This is important as the directory structure is recreated every time we build the project, and will be missing in a CI/CD context.

   ```mjs
   if (!fs.existsSync(fileDir)) {
     console.log(`Creating directory ${fileDir}`);
     fs.mkdirSync(fileDir, { recursive: true });
   }
   ```

8. The HTML is written to the filesystem at the specified path.

   ```mjs
   console.log(`Writing file ${filePath}`);
   fs.writeFile(filePath, pageHtml, (err) => {
     if (err) {
       console.error(err);
       return;
     }
     console.log(`Done writing file ${filePath}`);
   });
   ```

9. Finally, we perform some cleanup. Closing the browser page for each route, and after all routes are handled then closing the browser and web server.

   ```mjs
     await page.close();
   }

   // Teardown
   console.log("Closing browser");
   await browser.close();

   console.log("Closing preview server");
   previewServer.httpServer.close();
   ```

### Running the Prerender Script

The last piece of the puzzle is to run the script. This is done by just adding it to your `package.json`:

```json
{
  ...
  "scripts": {
    ...
    "prerender": "node prerender.mjs",
  }
  ...
}
```

Now you can just call it with:

```sh
npm run prerender
```

I went a step further with mine and added steps specific to running in a CI/CD pipeline. Unfortunately there were some hoops to jump through due to missing dependencies but if you're going to run Puppeteer in GitHub Actions, you will probably want to add the following:

```json
{
  ...
  "scripts": {
    ...
    "preprerender:ci": "apt-get update && apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libnss3 lsb-release xdg-utils wget",
    "prerender:ci": "npx puppeteer browsers install chrome && node prerender.mjs"
  }
  ...
}
```

## The Part About SWA

Due to the way that Azure Static Web Apps manages routing, requests to a folder path will attempt to serve a default file if available. That means that a request to `/some/path/` will serve `/some/path/index.html` if it's available.

This default behaviour is key to my SSG implementation. I output all the rendered HTML as an `index.html` at the folder path matching their respective routes.

When a request is made to https://www.mtmilo.net/blog/1-prerendered-swa, it returns the contents of `/blog/1-prerendered-swa/index.html`. Because the prerendered HTML also includes the JS bundle, it runs the clientside script and begins to operate as a standard SPA for all the following page navigations.

## Summary

SSG isn't for everyone and my implementation isn't the only way to achieve it. Some frameworks come with some version out-of-the-box, while others have superior alternatives.

What I've outlined in this article is just one solution for a small subset of existing applications. It's probably not best practice, it may not work forever, and you almost certainly should not use it for your client's new production code.

But for the few people out there who do find it useful, I hope I helped you prerender your way out of working this weekend.
