import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime Image to Video Prompt Pack Builder | Seedance Workflow | GenAnime",
  description:
    "Build Seedance-ready anime image-to-video prompt packs with master prompts, negative prompts, shot lists, and export settings.",
  keywords: [
    "anime image to video",
    "image to video anime ai",
    "seedance image to video",
    "anime video prompt builder",
    "seedance workflow tool",
  ],
  alternates: {
    canonical: "https://genanime.art/anime-image-to-video",
  },
  openGraph: {
    type: "website",
    url: "https://genanime.art/anime-image-to-video",
    title: "Anime Image to Video Prompt Pack Builder",
    description:
      "Generate practical Seedance workflow prompt packs for anime creators.",
    images: [
      {
        url: "https://genanime.art/images/prompts/anime_waifu_16.webp",
        width: 1200,
        height: 630,
        alt: "Anime image to video Seedance workflow builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anime Image to Video Prompt Pack Builder",
    description:
      "From anime concept to execution: generate a full Seedance-ready prompt pack.",
    images: ["https://genanime.art/images/prompts/anime_waifu_16.webp"],
  },
};
