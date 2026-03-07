import Link from 'next/link'
import { formatDate } from '@/app/blog/utils'
import { getProjects } from '@/app/projects/utils'
import { Tag } from './tag'

export function ProjectPosts() {
  const allProjects = getProjects()

  return (
    <div>
      {allProjects
        .sort((a, b) =>
          new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ? -1
            : 1
        )
        .map((project) => (
          <div key={project.slug} className="flex flex-col space-y-1 mb-4">
            <Link
              href={`/projects/${project.slug}`}
              className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2"
            >
              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums whitespace-nowrap">
                {formatDate(project.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {project.metadata.title}
              </p>
            </Link>
            {/* {project.metadata.tags && project.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.metadata.tags.map((t) => (
                  <Tag key={t.name} tag={t.name} color={t.color} size="sm" />
                ))}
              </div>
            )} */}
          </div>
        ))}
    </div>
  )
}
