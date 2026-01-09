import { NextRequest, NextResponse } from "next/server";

const siteMapData = {
  baseUrl: "https://genanime.art",
  lastmod: new Date().toISOString().split("T")[0],
  pages: [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/generator", changefreq: "daily", priority: 0.9 },
    { url: "/gallery", changefreq: "daily", priority: 0.8 },
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
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${siteMapData.pages
        .map(
          (page) => `
        <url>
          <loc>${siteMapData.baseUrl}${page.url}</loc>
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
