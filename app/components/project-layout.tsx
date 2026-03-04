import type { ReactNode } from 'react'
import type { ProjectMeta } from '@/app/projects/utils'
import { formatDate } from '@/app/blog/utils'
import { siteConfig } from '@/app/config'
import { Tag } from '@/app/components/tag'
import { Github, Star } from 'lucide-react'

async function fetchGitHubStars(
  githubUrl: string
): Promise<number | null> {
  try {
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (!match) return null
    const [, owner, repo] = match
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return typeof data.stargazers_count === 'number'
      ? data.stargazers_count
      : null
  } catch {
    return null
  }
}

export async function ProjectLayout({
  meta,
  slug,
  children,
}: {
  meta: ProjectMeta
  slug: string
  children: ReactNode
}) {
  const stars = meta.github ? await fetchGitHubStars(meta.github) : null

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: meta.title,
            datePublished: meta.publishedAt,
            description: meta.summary,
            ...(meta.tags?.length && { keywords: meta.tags.map((t) => t.name) }),
            ...(meta.github && { codeRepository: meta.github }),
            url: `${siteConfig.baseUrl}/projects/${slug}`,
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
        {meta.github && (
          <a
            href={meta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
          >
            <Github size={16} />
            GitHub
            {stars !== null && (
              <>
                <span className="text-neutral-300 dark:text-neutral-600">|</span>
                <Star size={14} fill="currentColor" className="text-yellow-400 transition-transform duration-200 group-hover:rotate-[15deg] group-hover:scale-125" />
                {stars}
              </>
            )}
          </a>
        )}
      </div>
      <article className="prose">{children}</article>
    </section>
  )
}
