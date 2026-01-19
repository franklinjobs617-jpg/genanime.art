import { NextRequest, NextResponse } from "next/server";

interface Page {
  url: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

const siteMapData = {
  baseUrl: "https://genanime.art",
  lastmod: new Date().toISOString().split("T")[0],
  locales: [ "es"],

  translatedPages: [
    { url: "", changefreq: "daily", priority: 1.0 },
    { url: "/generator", changefreq: "daily", priority: 0.9 },
    { url: "/image-to-prompt", changefreq: "daily", priority: 0.8 },
    { url: "/how-to-reverse-image-to-prompt-anime-guide", changefreq: "monthly", priority: 0.7 },
  ] as Page[],

  englishOnlyPages: [
    { url: "/gallery", changefreq: "daily", priority: 0.9 },
    { url: "/prompt-library", changefreq: "daily", priority: 0.8 },
    { url: "/pricing", changefreq: "weekly", priority: 0.7 },
    { url: "/blog", changefreq: "daily", priority: 0.8 },
    {
      url: "/blog/how-to-make-anime-art-ai-rtx-8090-guide",
      changefreq: "monthly",
      priority: 0.7,
    },
    { url: "/contact", changefreq: "monthly", priority: 0.6 },
    { url: "/support", changefreq: "monthly", priority: 0.5 },
    { url: "/terms", changefreq: "yearly", priority: 0.3 },
    { url: "/privacy", changefreq: "yearly", priority: 0.3 },
  ] as Page[],
};

export async function GET(request: NextRequest) {
  const allUrls: Array<any> = [];

  siteMapData.translatedPages.forEach((page) => {
    const alternates = [
      { hreflang: "x-default", href: `${siteMapData.baseUrl}${page.url}` },
      { hreflang: "en", href: `${siteMapData.baseUrl}${page.url}` },
      ...siteMapData.locales.map((lang) => ({
        hreflang: lang,
        href: `${siteMapData.baseUrl}/${lang}${page.url}`,
      })),
    ];

    allUrls.push({
      loc: `${siteMapData.baseUrl}${page.url}`,
      changefreq: page.changefreq,
      priority: page.priority,
      alternates: alternates,
    });

    siteMapData.locales.forEach((locale) => {
      allUrls.push({
        loc: `${siteMapData.baseUrl}/${locale}${page.url}`,
        changefreq: page.changefreq,
        priority: page.priority,
        alternates: alternates, // 每个语种版本都要包含完整的 alternate 关系
      });
    });
  });

  // 2. 处理仅英文的页面逻辑
  siteMapData.englishOnlyPages.forEach((page) => {
    allUrls.push({
      loc: `${siteMapData.baseUrl}${page.url}`,
      changefreq: page.changefreq,
      priority: page.priority,
      alternates: [], // 仅英文页面无需 alternate 标签
    });
  });

  // 3. 构建 XML 字符串
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  ${allUrls
      .map(
        (page) => `
  <url>
    <loc>${page.loc}</loc>
    ${page.alternates
            .map(
              (alt: any) =>
                `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`
            )
            .join("")}
    <lastmod>${siteMapData.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      )
      .join("")}
</urlset>`;

  return new NextResponse(sitemapXml.trim(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}