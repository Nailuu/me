import { getBlogPosts } from '@/app/blog/utils'
import { getProjects } from '@/app/projects/utils'
import { siteConfig } from '@/app/config'

export function GET() {
  const blogs = getBlogPosts().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  )
  const projects = getProjects().sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  )

  const lines = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    "Julian is a Full-Stack Developer working in Luxembourg and a former 42 student. This site showcases projects and documents technical problems and solutions.",
    '',
    `## Blog`,
    '',
    ...blogs.map(
      (post) =>
        `- [${post.metadata.title}](${siteConfig.baseUrl}/blog/${post.slug}): ${post.metadata.summary}`
    ),
    '',
    `## Projects`,
    '',
    ...projects.map(
      (project) =>
        `- [${project.metadata.title}](${siteConfig.baseUrl}/projects/${project.slug}): ${project.metadata.summary}`
    ),
    '',
    '## Links',
    '',
    `- [GitHub](${siteConfig.github})`,
    `- [Email](mailto:${siteConfig.email})`,
    `- [RSS](${siteConfig.baseUrl}/rss)`,
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
