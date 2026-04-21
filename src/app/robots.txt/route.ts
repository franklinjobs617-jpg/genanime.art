import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bingbot
Allow: /

Host: https://genanime.art
Sitemap: https://genanime.art/sitemap.xml`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
