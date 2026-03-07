import { siteConfig } from '@/app/config'

export default function robots() {
  return {
    rules: [{ userAgent: '*' }],
    allow: '/',
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  }
}
