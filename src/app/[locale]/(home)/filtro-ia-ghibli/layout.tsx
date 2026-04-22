import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://genanime.art/pt/filtro-ia-ghibli/",
  },
};

export default function FiltroIAGhibliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
