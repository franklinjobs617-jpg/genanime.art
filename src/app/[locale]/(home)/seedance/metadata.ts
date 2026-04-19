import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seedance Workflow Hub for Anime Creators | GenAnime",
  description:
    "Learn and execute a practical Seedance anime workflow: prompt templates, camera-motion patterns, and image-to-video prompt-pack generation.",
  keywords: [
    "seedance",
    "seedance anime",
    "seedance 2.0",
    "seedance workflow",
    "anime image to video",
    "seedance prompt guide",
  ],
  alternates: {
    canonical: "https://genanime.art/seedance",
  },
  openGraph: {
    type: "website",
    url: "https://genanime.art/seedance",
    title: "Seedance Workflow Hub for Anime Creators",
    description:
      "Practical Seedance hub with anime templates and image-to-video workflow guidance.",
    images: [
      {
        url: "https://genanime.art/images/prompts/anime_waifu_16.webp",
        width: 1200,
        height: 630,
        alt: "Seedance workflow hub for anime creators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seedance Workflow Hub for Anime Creators",
    description:
      "Use practical anime workflows for Seedance: templates, prompts, and execution guidance.",
    images: ["https://genanime.art/images/prompts/anime_waifu_16.webp"],
  },
};
