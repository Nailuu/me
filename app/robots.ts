import { siteConfig } from '@/app/config'

export default function robots() {
  return {
    rules: [{ userAgent: '*' }],
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  }
}
