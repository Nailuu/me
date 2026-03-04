import { siteConfig } from '@/app/config'
import { Rss, Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <Rss size={14} className="translate-y-px" />
            <span className="ml-2">rss</span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href={siteConfig.github}
          >
            <Github size={14} className="translate-y-px" />
            <span className="ml-2">github</span>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            href={`mailto:${siteConfig.email}`}
          >
            <Mail size={14} className="translate-y-px" />
            <span className="ml-2">email</span>
          </a>
        </li>
      </ul>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        &copy; {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  )
}
