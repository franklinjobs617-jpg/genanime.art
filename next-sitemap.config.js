/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://genanime.art',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/api/*'],
    alternateRefs: [
        {
            href: 'https://genanime.art/',
            hreflang: 'en',
        },
        {
            href: 'https://genanime.art/id',
            hreflang: 'id',
        },
        {
            href: 'https://genanime.art/de',
            hreflang: 'de',
        },
        {
            href: 'https://genanime.art/es',
            hreflang: 'es',
        },
        {
            href: 'https://genanime.art/ru',
            hreflang: 'ru',
        },
        {
            href: 'https://genanime.art/pt',
            hreflang: 'pt',
        },
    ],
}
