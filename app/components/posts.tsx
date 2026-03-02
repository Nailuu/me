import Link from 'next/link'
import { formatDate, getBlogPosts } from '@/app/blog/utils'
import { Tag } from '@/app/components/tag'

export function BlogPosts() {
  const allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) =>
          new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ? -1
            : 1
        )
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums whitespace-nowrap">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
            {post.metadata.tags?.length && (
              <div className="flex flex-wrap gap-1">
                {post.metadata.tags.map((tag) => (
                  <Tag key={tag.name} tag={tag.name} color={tag.color} size="sm" />
                ))}
              </div>
            )}
          </Link>
        ))}
    </div>
  )
}
