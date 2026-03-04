import { getBlogPosts } from '@/app/blog/utils'
import { getProjects } from '@/app/projects/utils'
import { siteConfig } from '@/app/config'

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${siteConfig.baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  const projects = getProjects().map((project) => ({
    url: `${siteConfig.baseUrl}/projects/${project.slug}`,
    lastModified: project.metadata.publishedAt,
  }))

  const routes = ['', '/blog', '/projects'].map((route) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...projects]
}
