import { NextRequest, NextResponse } from "next/server";

const siteMapData = {
  baseUrl: "https://genanime.art",
  lastmod: new Date().toISOString().split("T")[0],
  locales: ["id", "de"],

  translatedPages: [
    { url: "", changefreq: "daily", priority: 1.0 },
    { url: "/gallery", changefreq: "daily", priority: 0.9 },
    { url: "/prompt-library", changefreq: "daily", priority: 0.8 },
  ],

  englishOnlyPages: [
    { url: "/generator", changefreq: "daily", priority: 0.9 },
    { url: "/pricing", changefreq: "weekly", priority: 0.7 },
    { url: "/contact", changefreq: "monthly", priority: 0.6 },
    { url: "/blog", changefreq: "daily", priority: 0.8 },
    {
      url: "/blog/how-to-make-anime-art-ai-rtx-8090-guide",
      changefreq: "monthly",
      priority: 0.7,
    },
    { url: "/support", changefreq: "monthly", priority: 0.5 },
    { url: "/terms", changefreq: "yearly", priority: 0.3 },
    { url: "/privacy", changefreq: "yearly", priority: 0.3 },
  ],
};

export async function GET(request: NextRequest) {
  const allUrls: Array<any> = [];

  siteMapData.translatedPages.forEach((page) => {
    allUrls.push({
      loc: `${siteMapData.baseUrl}${page.url}`,
      ...page,
    });

    siteMapData.locales.forEach((locale) => {
      const urlPath = page.url === "" ? "" : page.url;
      allUrls.push({
        loc: `${siteMapData.baseUrl}/${locale}${urlPath}`,
        changefreq: page.changefreq,
        priority: page.priority,
      });
    });
  });

  siteMapData.englishOnlyPages.forEach((page) => {
    allUrls.push({
      loc: `${siteMapData.baseUrl}${page.url}`,
      ...page,
    });
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls
      .map(
        (page) => `
        <url>
          <loc>${page.loc}</loc>
          <lastmod>${siteMapData.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `
      )
      .join("")}
    </urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}