/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://sim-obleklo.bg',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', disallow: '/admin' },
        ],
    },
    exclude: ['/api/*'],
};