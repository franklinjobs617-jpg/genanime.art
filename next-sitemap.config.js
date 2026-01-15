/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://genanime.art',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/api/*', '/server-sitemap.xml'], // exclude api routes
    alternateRefs: [
        {
            href: 'https://genanime.art/en',
            hreflang: 'en',
        },
        {
            href: 'https://genanime.art/es',
            hreflang: 'es',
        },
        {
            href: 'https://genanime.art/de',
            hreflang: 'de',
        },
        {
            href: 'https://genanime.art/id',
            hreflang: 'id',
        },
    ],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://genanime.art/server-sitemap.xml', // if you have dynamic sitemap
        ],
    },
}
