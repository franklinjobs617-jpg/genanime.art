import GeneratorClient from "./GeneratorClient"

export const metadata = {
  alternates: {
    canonical: 'https://genanime.art/generator',
  },
};
import { Suspense } from 'react';


export default function GeneratorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white p-10">Loading Generator...</div>}>
      <GeneratorClient />
    </Suspense>
  );
}