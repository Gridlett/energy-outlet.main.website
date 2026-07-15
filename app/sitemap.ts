import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://energy-outlet.space'
  const changeFrequency = 'weekly' as const

  const routes = [
    '',
    '/about',
    '/contact',
    '/invest',
    '/lease-to-own',
    '/faq',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority: route === '' ? 1.0 : 0.8,
  }))
}
