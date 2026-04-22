import { MetadataRoute } from "next";

const BASE_URL = "https://genanime.art";
const LOCALES = ["en", "id", "de", "es", "ru", "pt"] as const;
type Locale = (typeof LOCALES)[number];

function localizedUrl(path: string, locale: Locale): string {
  if (locale === "en") return `${BASE_URL}${path}`;
  return `${BASE_URL}/${locale}${path}`;
}

function buildEntry(
  path: string,
  options: {
    priority?: number;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    lastModified?: Date;
    locales?: readonly Locale[];
  } = {}
): MetadataRoute.Sitemap[number][] {
  const {
    priority = 0.7,
    changeFrequency = "weekly",
    lastModified = new Date(),
    locales = LOCALES,
  } = options;

  const alternates =
    locales.length > 1
      ? {
          languages: Object.fromEntries([
            ...locales.map((locale) => [locale, localizedUrl(path, locale)]),
            ["x-default", localizedUrl(path, locales.includes("en") ? "en" : locales[0])],
          ]),
        }
      : undefined;

  return locales.map((locale) => ({
    url: localizedUrl(path, locale),
    lastModified,
    changeFrequency,
    priority,
    alternates,
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
    ...buildEntry("/seedance", { priority: 0.86, changeFrequency: "weekly" }),
    ...buildEntry("/seedance-anime-prompts", { priority: 0.84, changeFrequency: "weekly" }),
    ...buildEntry("/anime-image-to-video", { priority: 0.88, changeFrequency: "weekly" }),
    ...buildEntry("/ai-ad-background-anime", { priority: 0.82, changeFrequency: "weekly" }),
    ...buildEntry("/image-to-prompt", { priority: 0.82, changeFrequency: "weekly" }),
    ...buildEntry("/gpt-2", { priority: 0.86, changeFrequency: "weekly" }),

    // Tools
    ...buildEntry("/tools/anime-voice-changer", { priority: 0.75, changeFrequency: "monthly" }),
    ...buildEntry("/models/pony-diffusion", { priority: 0.7, changeFrequency: "monthly" }),

    // Content
    ...buildEntry("/blog", { priority: 0.7, changeFrequency: "weekly" }),
    ...buildEntry("/blog/how-to-make-anime-art-ai-rtx-8090-guide", { priority: 0.65, changeFrequency: "monthly" }),
    ...buildEntry("/how-to-reverse-image-to-prompt-anime-guide", { priority: 0.65, changeFrequency: "monthly" }),

    // PT-specific pages
    ...[
      "/foto-de-perfil-anime",
      "/filtro-ia-ghibli",
      "/transformar-foto-em-anime",
      "/transformar-foto-em-desenho",
      "/como-fazer-anime-ia",
      "/imagens-de-anime-ia",
    ].flatMap((path) =>
      buildEntry(path, {
        locales: ["pt"] as const,
        priority: 0.7,
        changeFrequency: "monthly",
      })
    ),

    // Support
    ...buildEntry("/contact", { priority: 0.5, changeFrequency: "monthly" }),
    ...buildEntry("/support", { priority: 0.45, changeFrequency: "monthly" }),
    ...buildEntry("/privacy", { priority: 0.4, changeFrequency: "yearly" }),
    ...buildEntry("/terms", { priority: 0.4, changeFrequency: "yearly" }),
  ];
}
