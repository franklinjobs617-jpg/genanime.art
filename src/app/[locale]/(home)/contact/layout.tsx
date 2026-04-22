import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://genanime.art/contact/",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
