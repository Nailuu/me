import { siteConfig } from '@/app/config'
import { getBlogPosts } from '@/app/blog/utils'
import { getProjects } from '@/app/projects/utils'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const allBlogs = getBlogPosts().map((post) => ({
    ...post,
    type: 'blog' as const,
  }))
  const allProjects = getProjects().map((project) => ({
    ...project,
    type: 'projects' as const,
  }))

  const allItems = [...allBlogs, ...allProjects]

  const itemsXml = allItems
    .sort((a, b) =>
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
        ? -1
        : 1
    )
    .map(
      (item) =>
        `<item>
        <title>${escapeXml(item.metadata.title)}</title>
        <link>${siteConfig.baseUrl}/${item.type}/${item.slug}</link>
        <description>${escapeXml(item.metadata.summary || '')}</description>
        <pubDate>${new Date(item.metadata.publishedAt).toUTCString()}</pubDate>
        ${(item.metadata.tags ?? []).map((tag) => `<category>${escapeXml(tag.name)}</category>`).join('\n        ')}
      </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${siteConfig.name}</title>
      <link>${siteConfig.baseUrl}</link>
      <description>This is my portfolio RSS feed</description>
      ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, { headers: { 'Content-Type': 'text/xml' } })
}
