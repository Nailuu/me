import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { siteConfig } from '@/app/config'

export type ProjectMeta = {
  title: string
  publishedAt: string
  summary: string
  tags?: { name: string; color?: string }[]
  github?: string
  image?: string
}

export function getProjects(): { metadata: ProjectMeta; slug: string }[] {
  const projectsDir = path.join(process.cwd(), 'app', 'projects')
  const entries = fs.readdirSync(projectsDir, { withFileTypes: true })

  return entries
    .filter((entry) => {
      if (!entry.isDirectory()) return false
      const metaPath = path.join(projectsDir, entry.name, 'meta.json')
      return fs.existsSync(metaPath)
    })
    .map((entry) => {
      const metaPath = path.join(projectsDir, entry.name, 'meta.json')
      const metadata: ProjectMeta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
      return { metadata, slug: entry.name }
    })
}

export function projectMetadata(meta: ProjectMeta): Metadata {
  let ogUrl = `${siteConfig.baseUrl}/og?title=${encodeURIComponent(meta.title)}`
  if (meta.tags?.length) {
    ogUrl += `&tags=${encodeURIComponent(JSON.stringify(meta.tags.map((t) => ({ n: t.name, c: t.color }))))}`
  }
  const ogImage = meta.image ?? ogUrl
  return {
    title: meta.title,
    description: meta.summary,
    ...(meta.tags?.length && { keywords: meta.tags.map((t) => t.name) }),
    openGraph: {
      title: meta.title,
      description: meta.summary,
      type: 'article',
      publishedTime: meta.publishedAt,
      ...(meta.tags?.length && { tags: meta.tags.map((t) => t.name) }),
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
