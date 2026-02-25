import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { siteConfig } from '@/app/config'

export type PostMeta = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

export function getBlogPosts(): { metadata: PostMeta; slug: string }[] {
  const blogDir = path.join(process.cwd(), 'app', 'blog')
  const entries = fs.readdirSync(blogDir, { withFileTypes: true })

  return entries
    .filter((entry) => {
      if (!entry.isDirectory()) return false
      const metaPath = path.join(blogDir, entry.name, 'meta.json')
      return fs.existsSync(metaPath)
    })
    .map((entry) => {
      const metaPath = path.join(blogDir, entry.name, 'meta.json')
      const metadata: PostMeta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
      return { metadata, slug: entry.name }
    })
}

export function formatDate(date: string, includeRelative = false): string {
  const currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''
  if (yearsAgo > 0) formattedDate = `${yearsAgo}y ago`
  else if (monthsAgo > 0) formattedDate = `${monthsAgo}mo ago`
  else if (daysAgo > 0) formattedDate = `${daysAgo}d ago`
  else formattedDate = 'Today'

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) return fullDate
  return `${fullDate} (${formattedDate})`
}

export function postMetadata(meta: PostMeta): Metadata {
  const ogImage = meta.image ?? `${siteConfig.baseUrl}/og?title=${encodeURIComponent(meta.title)}`
  return {
    title: meta.title,
    description: meta.summary,
    openGraph: {
      title: meta.title,
      description: meta.summary,
      type: 'article',
      publishedTime: meta.publishedAt,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.summary,
      images: [ogImage],
    },
  }
}
