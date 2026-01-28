import { Metadata } from "next";

interface PageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params;

  if (locale === "es") {
    return {
      title: "Cómo Convertir Foto a Anime con IA - Guía Completa | GenAnime",
      description:
        "Aprende cómo convertir foto a anime usando IA. Descubre la mejor app para convertir foto a anime y convertir imagen a dibujo animado.",
      keywords:
        "convertir foto a anime, app para convertir foto a anime, convertir imagen a dibujo animado, generador de anime con IA",
      alternates: {
        canonical:
          "https://genanime.art/how-to-reverse-image-to-prompt-anime-guide",
        languages: {
          en: "https://genanime.art/how-to-reverse-image-to-prompt-anime-guide",
          es: "https://genanime.art/es/how-to-reverse-image-to-prompt-anime-guide",
        },
      },
      openGraph: {
        title: "Cómo Convertir Foto a Anime con IA - Guía Completa",
        description:
          "Aprende cómo convertir foto a anime usando IA. Descubre la mejor app para convertir foto a anime.",
        type: "article",
        locale: "es_ES",
        url: "https://genanime.art/es/how-to-reverse-image-to-prompt-anime-guide",
        images: [
          {
            url: "https://genanime.art/how-to-reverse-image-to-prompt-flux-ai-anime-tutorial.webp",
            width: 1200,
            height: 630,
            alt: "Guía Flux IA",
          },
        ],
      },
      other: {
        'preload': '/how-to-reverse-image-to-prompt-flux-ai-anime-tutorial.webp',
      },
    };
  }

  return {
    title: "Master Reverse Engineering: Flux AI Image to Prompt - GenAnime",
    description:
      'Learn how to deconstruct any anime masterpiece into a high-octane "magic spell" for your next generation.',
    alternates: {
      canonical:
        "https://genanime.art/how-to-reverse-image-to-prompt-anime-guide",
      languages: {
        en: "https://genanime.art/how-to-reverse-image-to-prompt-anime-guide",
        es: "https://genanime.art/es/how-to-reverse-image-to-prompt-anime-guide",
      },
    },
    openGraph: {
      title: "Master Reverse Engineering: Flux AI Image to Prompt",
      description:
        'Learn how to deconstruct any anime masterpiece into a high-octane "magic spell" for your next generation.',
      type: "article",
      locale: "en_US",
      url: "https://genanime.art/how-to-reverse-image-to-prompt-anime-guide",
      images: [
        {
          url: "https://genanime.art/how-to-reverse-image-to-prompt-flux-ai-anime-tutorial.webp",
          width: 1200,
          height: 630,
          alt: "Mastering Flux AI Anime Prompt Engineering Guide Hero Image",
        },
      ],
    },
    other: {
      'preload': '/how-to-reverse-image-to-prompt-flux-ai-anime-tutorial.webp',
    },
  };
}
