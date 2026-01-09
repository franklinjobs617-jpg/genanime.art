import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://genanime.art/sitemap.xml`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}