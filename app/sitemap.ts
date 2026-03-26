import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rendezvous-surlenil.com'

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL,                                         priority: 1.0, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/croisieres-dahabiya`,                priority: 0.9, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/sophie`,                             priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/la-thebaide`,                        priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/sejours`,                            priority: 0.85, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/sejours/signature`,                  priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/sejours/privileges`,                 priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/sejours/escapades-serenite`,         priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/sur-mesure`,                         priority: 0.75, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/blog`,                               priority: 0.8, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/guide-egypte`,                       priority: 0.75, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/contact`,                            priority: 0.6, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Routes dynamiques Sanity (articles + catégories)
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const { sanityClient } = await import('@/lib/sanity/client')
      const { sitemapQuery } = await import('@/lib/sanity/queries')
      const data = await sanityClient.fetch<{
        posts: Array<{ slug: { current: string }; _updatedAt: string }>
        categories: Array<{ slug: { current: string }; _updatedAt: string }>
      }>(sitemapQuery)

      const postRoutes: MetadataRoute.Sitemap = (data?.posts ?? []).map((p) => ({
        url: `${BASE_URL}/blog/${p.slug.current}`,
        lastModified: p._updatedAt,
        priority: 0.7,
        changeFrequency: 'monthly' as const,
      }))

      const categoryRoutes: MetadataRoute.Sitemap = (data?.categories ?? []).map((c) => ({
        url: `${BASE_URL}/blog/categorie/${c.slug.current}`,
        lastModified: c._updatedAt,
        priority: 0.5,
        changeFrequency: 'weekly' as const,
      }))

      return [...staticRoutes, ...postRoutes, ...categoryRoutes]
    }
  } catch {
    // Sanity non configuré — sitemap statique uniquement
  }

  return staticRoutes
}
