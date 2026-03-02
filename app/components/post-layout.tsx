import type { ReactNode } from 'react'
import type { PostMeta } from '@/app/blog/utils'
import { formatDate } from '@/app/blog/utils'
import { siteConfig } from '@/app/config'
import { Tag } from '@/app/components/tag'

export function PostLayout({
  meta,
  slug,
  children,
}: {
  meta: PostMeta
  slug: string
  children: ReactNode
}) {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: meta.title,
            datePublished: meta.publishedAt,
            dateModified: meta.publishedAt,
            description: meta.summary,
            ...(meta.tags?.length && { keywords: meta.tags.map((t) => t.name) }),
            image: meta.image
              ? `${siteConfig.baseUrl}${meta.image}`
              : `/og?title=${encodeURIComponent(meta.title)}`,
            url: `${siteConfig.baseUrl}/blog/${slug}`,
            author: { '@type': 'Person', name: 'My Portfolio' },
          }),
        }}
      />
      {meta.tags?.length && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {meta.tags.map((tag) => (
            <Tag key={tag.name} tag={tag.name} color={tag.color} />
          ))}
        </div>
      )}
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {meta.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(meta.publishedAt)}
        </p>
      </div>
      <article className="prose">{children}</article>
    </section>
  )
}
