import { NextRequest, NextResponse } from "next/server";

interface Page {
  url: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

const siteMapData = {
  baseUrl: "https://genanime.art",
  lastmod: new Date().toISOString().split("T")[0],
  locales: ["en", "id", "de", "es"],

  translatedPages: [
    { url: "", changefreq: "daily", priority: 1.0 },
    { url: "/generator", changefreq: "daily", priority: 1.0 },
    { url: "/gallery", changefreq: "daily", priority: 0.9 },
    { url: "/pricing", changefreq: "daily", priority: 0.9 },
    { url: "/prompt-library", changefreq: "daily", priority: 0.8 },
    { url: "/blog", changefreq: "daily", priority: 0.8 },
    { url: "/image-to-prompt", changefreq: "daily", priority: 0.8 },
    { url: "/models/pony-diffusion", changefreq: "weekly", priority: 0.8 },
    {
      url: "/how-to-reverse-image-to-prompt-anime-guide",
      changefreq: "monthly",
      priority: 0.7,
    },
    { url: "/ai-ad-background-anime", changefreq: "weekly", priority: 0.8 },
  ] as Page[],

  englishOnlyPages: [
    {
      url: "/blog/how-to-make-anime-art-ai-rtx-8090-guide",
      changefreq: "monthly",
      priority: 0.7,
    },
    { url: "/tools/anime-voice-changer", changefreq: "weekly", priority: 0.7 },
    { url: "/contact", changefreq: "monthly", priority: 0.6 },
    { url: "/support", changefreq: "monthly", priority: 0.5 },
    { url: "/terms", changefreq: "yearly", priority: 0.3 },
    { url: "/privacy", changefreq: "yearly", priority: 0.3 },
  ] as Page[],

  // 葡萄牙语特定页面 (PT Only)
  portuguesePages: [
    { url: "/como-fazer-anime-ia", changefreq: "monthly", priority: 0.7 },
    { url: "/filtro-ia-ghibli", changefreq: "monthly", priority: 0.7 },
    { url: "/foto-de-perfil-anime", changefreq: "monthly", priority: 0.7 },
    { url: "/imagens-de-anime-ia", changefreq: "monthly", priority: 0.7 },
    { url: "/transformar-foto-em-anime", changefreq: "monthly", priority: 0.7 },
    { url: "/transformar-foto-em-desenho", changefreq: "monthly", priority: 0.7 },
  ] as Page[],
};

export async function GET(request: NextRequest) {
  const allUrls: Array<any> = [];

  // 处理翻译页面 (包含多种语言)
  siteMapData.translatedPages.forEach((page) => {
    // 默认语言 (EN)
    const baseUrl = `${siteMapData.baseUrl}${page.url}`;
    const alternates = [
      { hreflang: "x-default", href: baseUrl },
      { hreflang: "en", href: baseUrl },
      ...siteMapData.locales
        .filter((lang) => lang !== "en") // 排除默认语言，避免重复
        .map((lang) => ({
          hreflang: lang,
          href: `${siteMapData.baseUrl}/${lang}${page.url}`,
        })),
    ];

    allUrls.push({
      loc: baseUrl,
      changefreq: page.changefreq,
      priority: page.priority,
      alternates: alternates,
    });

    // 其他语言版本
    siteMapData.locales
      .filter((lang) => lang !== "en")
      .forEach((locale) => {
        allUrls.push({
          loc: `${siteMapData.baseUrl}/${locale}${page.url}`,
          changefreq: page.changefreq,
          priority: page.priority,
          alternates: alternates,
        });
      });
  });

  // 处理仅英语页面
  siteMapData.englishOnlyPages.forEach((page) => {
    allUrls.push({
      loc: `${siteMapData.baseUrl}${page.url}`,
      changefreq: page.changefreq,
      priority: page.priority,
      alternates: [],
    });
  });

  // 处理葡萄牙语特定页面
  siteMapData.portuguesePages.forEach((page) => {
    const ptUrl = `${siteMapData.baseUrl}/pt${page.url}`;
    allUrls.push({
      loc: ptUrl,
      changefreq: page.changefreq,
      priority: page.priority,
      alternates: [{ hreflang: "pt", href: ptUrl }],
    });
  });

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
