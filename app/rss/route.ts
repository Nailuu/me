import { siteConfig } from '@/app/config'
import { getBlogPosts } from '@/app/blog/utils'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const allBlogs = getBlogPosts()

  const itemsXml = allBlogs
    .sort((a, b) =>
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
        ? -1
        : 1
    )
    .map(
      (post) =>
        `<item>
        <title>${escapeXml(post.metadata.title)}</title>
        <link>${siteConfig.baseUrl}/blog/${post.slug}</link>
        <description>${escapeXml(post.metadata.summary || '')}</description>
        <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
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
