import { MetadataRoute } from "next";

const BASE_URL = "https://genanime.art";
const LOCALES = ["en", "id", "de", "es", "ru", "pt"] as const;

function localizedUrl(path: string, locale: string): string {
  if (locale === "en") return `${BASE_URL}${path}`;
  return `${BASE_URL}/${locale}${path}`;
}

function buildEntry(
  path: string,
  options: {
    priority?: number;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    lastModified?: Date;
  } = {}
): MetadataRoute.Sitemap[number][] {
  const { priority = 0.7, changeFrequency = "weekly", lastModified = new Date() } = options;

  return LOCALES.map((locale) => ({
    url: localizedUrl(path, locale),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l === "en" ? "x-default" : l, localizedUrl(path, l)])
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core pages
    ...buildEntry("/", { priority: 1.0, changeFrequency: "daily" }),
    ...buildEntry("/generator", { priority: 0.95, changeFrequency: "daily" }),
    ...buildEntry("/gallery", { priority: 0.8, changeFrequency: "daily" }),
    ...buildEntry("/pricing", { priority: 0.85, changeFrequency: "weekly" }),

    // SEO tool pages
    ...buildEntry("/anime-name-generator", { priority: 0.9, changeFrequency: "weekly" }),
    ...buildEntry("/random-anime-character-generator", { priority: 0.9, changeFrequency: "weekly" }),
    ...buildEntry("/prompt-library", { priority: 0.85, changeFrequency: "weekly" }),

    // Tools
    ...buildEntry("/tools/anime-voice-changer", { priority: 0.75, changeFrequency: "monthly" }),

    // Content
    ...buildEntry("/blog", { priority: 0.7, changeFrequency: "weekly" }),
    ...buildEntry("/blog/how-to-make-anime-art-ai-rtx-8090-guide", { priority: 0.65, changeFrequency: "monthly" }),
    ...buildEntry("/how-to-reverse-image-to-prompt-anime-guide", { priority: 0.65, changeFrequency: "monthly" }),

    // PT-specific pages
    ...[
      "/foto-de-perfil-anime",
      "/filtro-ia-ghibli",
      "/transformar-foto-em-desenho",
      "/como-fazer-anime-ia",
    ].map((path) => ({
      url: `${BASE_URL}/pt${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    // Support
    ...buildEntry("/contact", { priority: 0.5, changeFrequency: "monthly" }),
    ...buildEntry("/privacy", { priority: 0.4, changeFrequency: "yearly" }),
    ...buildEntry("/terms", { priority: 0.4, changeFrequency: "yearly" }),
  ];
}
