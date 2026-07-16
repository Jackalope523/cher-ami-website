import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: 'https://thecherami.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `https://thecherami.com/blog/${post.slug}`,
      lastModified: new Date(post.dateISO),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  return [
    {
      url: 'https://thecherami.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...blogEntries,
    
    {
      url: 'https://thecherami.com/example',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    
    {
      url: 'https://thecherami.com/help',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://thecherami.com/help/general',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://thecherami.com/help/account',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://thecherami.com/help/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://thecherami.com/help/billing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    {
      url: 'https://thecherami.com/communities',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    {
      url: 'https://thecherami.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },

    {
      url: 'https://thecherami.com/legal',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: 'https://thecherami.com/legal/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://thecherami.com/legal/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://thecherami.com/legal/return',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}