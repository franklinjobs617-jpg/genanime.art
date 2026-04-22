import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical:
      "https://genanime.art/blog/how-to-make-anime-art-ai-rtx-8090-guide/",
  },
};

export default function AnimeRtxGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
