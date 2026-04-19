import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style Detective (Beta Preview) | GenAnime",
  description:
    "Style Detective is currently a beta preview. Join waitlist updates for full model-powered anime style analysis.",
  alternates: {
    canonical: "https://genanime.art/style-detective",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};
